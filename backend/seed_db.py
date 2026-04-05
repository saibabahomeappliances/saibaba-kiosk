import os
from sqlmodel import Session, create_engine, select, text, SQLModel
from dotenv import load_dotenv
from pathlib import Path
import uuid
from server import Product, Category, create_db_and_tables, engine

# Load env - redundant as server imports it, but good for standalone
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

initial_categories = [
  Category(id=str(uuid.uuid4()), title="Refrigerators", image="https://images.unsplash.com/photo-1571175443880-49e1d58b95da?auto=format&fit=crop&w=800&q=80"),
  Category(id=str(uuid.uuid4()), title="Washing Machines", image="https://images.unsplash.com/photo-1626806775351-538af440617c?auto=format&fit=crop&w=800&q=80"),
  Category(id=str(uuid.uuid4()), title="Air Conditioners", image="https://images.unsplash.com/photo-1614631446501-abcf76949eca?auto=format&fit=crop&w=800&q=80"),
  Category(id=str(uuid.uuid4()), title="Televisions", image="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80"),
  Category(id=str(uuid.uuid4()), title="Kitchen Appliances", image="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80"),
  Category(id=str(uuid.uuid4()), title="Small Appliances", image="https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80"),
]

initial_products = [
    Product(
        id=str(uuid.uuid4()),
        title="Samsung 253L Refrigerator",
        description="3 Star Inverter Frost-Free Double Door Refrigerator",
        price=24990.0,
        category="Refrigerators",
        image="https://images.unsplash.com/photo-1571175443880-49e1d58b95da?auto=format&fit=crop&w=800&q=80",
        model_number="RT28T3483S8",
        specifications='["253L Capacity", "Frost Free", "Convertible 3-in-1"]'
    ),
    Product(
        id=str(uuid.uuid4()),
        title="LG 7kg Front Load",
        description="Fully Automatic Front Load Washing Machine with Steam",
        price=29990.0,
        category="Washing Machines",
        image="https://images.unsplash.com/photo-1626806775351-538af440617c?auto=format&fit=crop&w=800&q=80",
        model_number="FHM1207SDL",
        specifications='["7kg Capacity", "1200 RPM", "Steam Wash"]'
    ),
    Product(
        id=str(uuid.uuid4()),
        title="Sony Bravia 55 inch 4K",
        description="Ultra HD Smart LED Google TV",
        price=63990.0,
        category="Televisions",
        image="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
        model_number="KD-55X74L",
         specifications='["4K HDR", "Google TV", "X1 Processor"]'
    )
]

def seed():
    print("Initializing Database...")
    # Clean only OUR tables
    print("Dropping old SB tables if exist...")
    SQLModel.metadata.drop_all(engine)
    
    print("Creating new SB tables...")
    create_db_and_tables()
    
    with Session(engine) as session:
        # Insert new
        print("Seeding new data...")
        for cat in initial_categories:
            session.add(cat)
        
        for prod in initial_products:
            session.add(prod)
            
        session.commit()
        print("Seeding Complete!")

if __name__ == "__main__":
    seed()
