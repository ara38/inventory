from sqlalchemy import Column, Integer, Float, String
from database import Base, db_session
from random import randint

class General_items(Base):

    params = [ 'id', 'title', 'description', 'price',]

    __tablename__ = "General_items"
    
    id = Column(Integer, primary_key=True, nullable=False, unique=False)
    title = Column(String, primary_key=False, nullable=False, unique=False)
    description = Column(String, primary_key=False, nullable=False, unique=False)
    price = Column(Float, primary_key=False, nullable=False, unique=False)

    def __init__(self, id,title,description,price):
        
        self.id = id
        self.title = title
        self.description = description
        self.price = price
        
        # set the id of the object to a random value
        # using a range unlikely to collide with other ids
        self.id = randint(0, 1000000)
    
    def __repr__(self):
        return '[General_items %r]' %self.id
        
    def __iter__(self):
        
        yield 'id', self.id
        yield 'title', self.title
        yield 'description', self.description
        yield 'price', self.price
        
    def __getitem(self, item):
        object_as_dict = dict(self)
        if item in object_as_dict:
            return object_as_dict[item]
        return None

def isValidGeneral_items(obj_id):
    try:
        return General_items.query.filter(General_items.id==obj_id).one_or_none() is not None
    except Exception:
        return False

def createGeneral_items(*args):
    if not isValidGeneral_items(args[0]):
        new_obj = General_items(*args)
        db_session.add(new_obj)
        db_session.commit()
        return new_obj
    return dict() # an empty dict incase you are using **{} on this function's output

def readGeneral_items(obj_id):
    if not isValidGeneral_items(obj_id):
        return None
    return General_items.query.filter(General_items.id==obj_id).one()
    
def updateGeneral_items(obj_id, **kwargs):
    if not isValidGeneral_items(obj_id):
        return False
        
    retrieved_object = readGeneral_items(obj_id)
        
    for key, value in kwargs.items():
        if key in General_items.params:
            
            if key == 'id':
                retrieved_object.id = value
            if key == 'title':
                retrieved_object.title = value
            if key == 'description':
                retrieved_object.description = value
            if key == 'price':
                retrieved_object.price = value
        
    db_session.commit()
    return True
    
def deleteGeneral_items(obj_id):
    if not isValidGeneral_items(obj_id):
        return False
        
    retrieved_object = readGeneral_items(obj_id)
    
    db_session.delete(retrieved_object)
    db_session.commit()
    return True

