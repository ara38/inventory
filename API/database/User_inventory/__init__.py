from sqlalchemy import Column, Integer
from database import Base, db_session
from random import randint

class User_inventory(Base):

    params = [ 'id', 'user_id', 'item_id',]

    __tablename__ = "User_inventory"
    
    id = Column(Integer, primary_key=True, nullable=False, unique=False)
    user_id = Column(Integer, primary_key=False, nullable=False, unique=False)
    item_id = Column(Integer, primary_key=False, nullable=False, unique=False)

    def __init__(self, id,user_id,item_id):
        
        self.id = id
        self.user_id = user_id
        self.item_id = item_id
        
        # set the id of the object to a random value
        # using a range unlikely to collide with other ids
        self.id = randint(0, 1000000)
    
    def __repr__(self):
        return '[User_inventory %r]' %self.id
        
    def __iter__(self):
        
        yield 'id', self.id
        yield 'user_id', self.user_id
        yield 'item_id', self.item_id
        
    def __getitem(self, item):
        object_as_dict = dict(self)
        if item in object_as_dict:
            return object_as_dict[item]
        return None

def isValidUser_inventory(obj_id):
    try:
        return User_inventory.query.filter(User_inventory.id==obj_id).one_or_none() is not None
    except Exception:
        return False

def createUser_inventory(*args):
    if not isValidUser_inventory(args[0]):
        new_obj = User_inventory(*args)
        db_session.add(new_obj)
        db_session.commit()
        return new_obj
    return dict() # an empty dict incase you are using **{} on this function's output

def readUser_inventory(obj_id):
    if not isValidUser_inventory(obj_id):
        return None
    return User_inventory.query.filter(User_inventory.id==obj_id).one()
    
def updateUser_inventory(obj_id, **kwargs):
    if not isValidUser_inventory(obj_id):
        return False
        
    retrieved_object = readUser_inventory(obj_id)
        
    for key, value in kwargs.items():
        if key in User_inventory.params:
            
            if key == 'id':
                retrieved_object.id = value
            if key == 'user_id':
                retrieved_object.user_id = value
            if key == 'item_id':
                retrieved_object.item_id = value
        
    db_session.commit()
    return True
    
def deleteUser_inventory(obj_id):
    if not isValidUser_inventory(obj_id):
        return False
        
    retrieved_object = readUser_inventory(obj_id)
    
    db_session.delete(retrieved_object)
    db_session.commit()
    return True

