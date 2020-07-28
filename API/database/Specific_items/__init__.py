from sqlalchemy import Column, Integer
from database import Base, db_session
from random import randint

class Specific_items(Base):

    params = [ 'id', 'specific_item_id', 'general_item_id',]

    __tablename__ = "Specific_items"
    
    id = Column(Integer, primary_key=True, nullable=False, unique=False)
    specific_item_id = Column(Integer, primary_key=False, nullable=False, unique=False)
    general_item_id = Column(Integer, primary_key=False, nullable=False, unique=False)

    def __init__(self, id,specific_item_id,general_item_id):
        
        self.id = id
        self.specific_item_id = specific_item_id
        self.general_item_id = general_item_id
        
        # set the id of the object to a random value
        # using a range unlikely to collide with other ids
        self.id = randint(0, 1000000)
    
    def __repr__(self):
        return '[Specific_items %r]' %self.id
        
    def __iter__(self):
        
        yield 'id', self.id
        yield 'specific_item_id', self.specific_item_id
        yield 'general_item_id', self.general_item_id
        
    def __getitem(self, item):
        object_as_dict = dict(self)
        if item in object_as_dict:
            return object_as_dict[item]
        return None

def isValidSpecific_items(obj_id):
    try:
        return Specific_items.query.filter(Specific_items.id==obj_id).one_or_none() is not None
    except Exception:
        return False

def createSpecific_items(*args):
    if not isValidSpecific_items(args[0]):
        new_obj = Specific_items(*args)
        db_session.add(new_obj)
        db_session.commit()
        return new_obj
    return dict() # an empty dict incase you are using **{} on this function's output

def readSpecific_items(obj_id):
    if not isValidSpecific_items(obj_id):
        return None
    return Specific_items.query.filter(Specific_items.id==obj_id).one()
    
def updateSpecific_items(obj_id, **kwargs):
    if not isValidSpecific_items(obj_id):
        return False
        
    retrieved_object = readSpecific_items(obj_id)
        
    for key, value in kwargs.items():
        if key in Specific_items.params:
            
            if key == 'id':
                retrieved_object.id = value
            if key == 'specific_item_id':
                retrieved_object.specific_item_id = value
            if key == 'general_item_id':
                retrieved_object.general_item_id = value
        
    db_session.commit()
    return True
    
def deleteSpecific_items(obj_id):
    if not isValidSpecific_items(obj_id):
        return False
        
    retrieved_object = readSpecific_items(obj_id)
    
    db_session.delete(retrieved_object)
    db_session.commit()
    return True

