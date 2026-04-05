from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
from contextlib import asynccontextmanager
import os
import logging
from pathlib import Path
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import smtplib
from email.message import EmailMessage

# Load env and setup
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')
DATABASE_URL = os.environ['DATABASE_URL']

# Database Setup
engine = create_engine(DATABASE_URL, echo=True)

# Function to initialize db tables
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Models
class StatusCheck(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Product(SQLModel, table=True):
    __tablename__ = "products"
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    title: str
    description: str
    price: float
    category: str
    image: str
    specifications: str = Field(default="[]") # JSON string
    model_number: str = Field(default="")

class Category(SQLModel, table=True):
    __tablename__ = "categories"
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    title: str
    image: str

class Enquiry(SQLModel, table=True):
    __tablename__ = "enquiries"
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    phone: str
    product: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# DTOs
class ProductCreate(SQLModel):
    title: str
    description: str
    price: float
    category: str
    image: str
    specifications: List[str] = []
    model_number: str = ""

class CategoryCreate(SQLModel):
    title: str
    image: str

class EnquiryCreate(SQLModel):
    name: str
    phone: str
    product: str
    message: str

class StatusCheckCreate(SQLModel):
    client_name: str

# App Lifecycle
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")

# Routes
@api_router.get("/")
def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
def create_status_check(input: StatusCheckCreate):
    with Session(engine) as session:
        status = StatusCheck(client_name=input.client_name)
        session.add(status)
        session.commit()
        session.refresh(status)
        return status

@api_router.get("/status", response_model=List[StatusCheck])
def get_status_checks():
    with Session(engine) as session:
        return session.exec(select(StatusCheck).limit(100)).all()

# Product Routes
@api_router.get("/products", response_model=List[Product])
def get_products():
    with Session(engine) as session:
        products = session.exec(select(Product)).all()
        # Convert JSON string specs to list if needed (frontend expects array)
        # However, for simplicity let's stick to standard returning.
        # Frontend might need adjustment if specs is string. 
        # Actually Pydantic/SQLModel handling of List<str> in SQL is tricky without JSON type.
        # I stored it as string for simplicity.
        return products

@api_router.post("/products", response_model=Product)
def create_product(input: ProductCreate):
    with Session(engine) as session:
        product = Product(
            **input.model_dump(exclude={"specifications"}),
            specifications=str(input.specifications)
        )
        session.add(product)
        session.commit()
        session.refresh(product)
        return product

@api_router.put("/products/{product_id}", response_model=Product)
def update_product(product_id: str, input: ProductCreate):
    with Session(engine) as session:
        product = session.get(Product, product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        product_data = input.model_dump(exclude={"specifications"})
        for key, value in product_data.items():
            setattr(product, key, value)
        product.specifications = str(input.specifications)
        
        session.add(product)
        session.commit()
        session.refresh(product)
        return product

@api_router.delete("/products/{product_id}")
def delete_product(product_id: str):
    with Session(engine) as session:
        product = session.get(Product, product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        session.delete(product)
        session.commit()
        return {"message": "Product deleted"}

# Category Routes
@api_router.get("/categories", response_model=List[Category])
def get_categories():
    with Session(engine) as session:
        return session.exec(select(Category)).all()

@api_router.post("/categories", response_model=Category)
def create_category(input: CategoryCreate):
    with Session(engine) as session:
        category = Category(**input.model_dump())
        session.add(category)
        session.commit()
        session.refresh(category)
        return category

@api_router.delete("/categories/{category_id}")
def delete_category(category_id: str):
    try:
        print(f"Attempting to delete category: {category_id}")
        with Session(engine) as session:
            category = session.get(Category, category_id)
            if not category:
                print("Category not found")
                raise HTTPException(status_code=404, detail="Category not found")
            session.delete(category)
            session.commit()
            print("Category deleted successfully")
            return {"message": "Category deleted"}
    except Exception as e:
        print(f"Error deleting category: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

def send_enquiry_email(enquiry_data: dict):
    smtp_user = os.environ.get("SMTP_USERNAME")
    smtp_pass = os.environ.get("SMTP_PASSWORD")
    contact_email = os.environ.get("CONTACT_EMAIL")
    
    if smtp_user and smtp_pass and contact_email:
        try:
            msg = EmailMessage()
            msg.set_content(f"Name: {enquiry_data.get('name')}\nPhone: {enquiry_data.get('phone')}\nInterested Product: {enquiry_data.get('product')}\n\nMessage:\n{enquiry_data.get('message')}")
            msg['Subject'] = f"New Enquiry from {enquiry_data.get('name')}"
            msg['From'] = smtp_user
            msg['To'] = contact_email
            
            with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=10) as server:
                server.login(smtp_user, smtp_pass)
                server.send_message(msg)
        except Exception as e:
            print(f"Error sending email: {e}")

# Enquiry Routes
@api_router.post("/enquiries", response_model=Enquiry)
def create_enquiry(input: EnquiryCreate, background_tasks: BackgroundTasks):
    with Session(engine) as session:
        enquiry = Enquiry(**input.model_dump())
        session.add(enquiry)
        session.commit()
        session.refresh(enquiry)
        
        enquiry_dict = {
            "name": enquiry.name,
            "phone": enquiry.phone,
            "product": enquiry.product,
            "message": enquiry.message
        }
        
        background_tasks.add_task(send_enquiry_email, enquiry_dict)
                
        return enquiry

@api_router.get("/enquiries", response_model=List[Enquiry])
def get_enquiries():
    with Session(engine) as session:
        return session.exec(select(Enquiry)).all()

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)