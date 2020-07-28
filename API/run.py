from flask import Flask
from server.Specific_items import blueprint_Specific_items
from server.General_items import blueprint_General_items
from server.User_inventory import blueprint_User_inventory

app = Flask(__name__)

if __name__ == "__main__":
    SERVER_ROOT = "127.0.0.1"
    app.debug = True
    
    # Register all the routes to the app
    app.register_blueprint(blueprint_Specific_items)
    app.register_blueprint(blueprint_General_items)
    app.register_blueprint(blueprint_User_inventory)
    
    
    # Startup the connection to the database
    from database import init_db
    init_db()
    
    # Begin the actual application, serving it at this port number
    app.run(host=SERVER_ROOT, port=2970)

