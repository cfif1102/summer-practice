from db.connection import DbConnection
from db.equipment import Equipment
from db.customer import Customer
from db.object import Object
from db.licenses import Licensees
from db.contracts import Contracts
from doc.doc import Doc

import eel

db = DbConnection("./db/docs.db")

db.create_tables()

objects = Object(db)
customers = Customer(db)
equipments = Equipment(db)
licenses = Licensees(db)
contracts = Contracts(db)

doc = Doc(equipments)

global_vars = {
    'object_id': 1,
    'customer_id': 1,
    'equipment_id': 1,
    'document_type': "act",
    'license_id': 1,
    'contract_id': 1
}

#----------------- CONTRACTS -----------------------

@eel.expose
def get_all_contracts_py():
    return contracts.findAll()

@eel.expose
def set_selected_contracts_py(id):
    global_vars['contract_id'] = int(id)

@eel.expose
def get_selected_contracts_py():
    return contracts.findOne(global_vars['contract_id'])

@eel.expose
def create_contracts_py(cont):
    number = cont['contract_number']
    customer_id = cont['customer_id']

    contracts.create(number, customer_id)

@eel.expose
def save_contracts_py(id, cont):
    id = int(id)

    number = cont['contract_number']
    customer_id = cont['customer_id']


    contracts.update(id, number, customer_id)

@eel.expose
def delete_contracts_py(id):
    id = int(id)

    contracts.delete(id)

#----------------- LICENSES -----------------------

@eel.expose
def get_all_licenses_py():
    return licenses.findAll()

@eel.expose
def set_selected_licenses_py(id):
    global_vars['license_id'] = int(id)

@eel.expose
def get_selected_licenses_py():
    return licenses.findOne(global_vars['license_id'])

@eel.expose
def create_licenses_py(lics):
    name = lics['name']
    customer_id = lics['customer_id']

    licenses.create(name, customer_id)

@eel.expose
def save_licenses_py(id, lics):
    id = int(id)

    name = lics['name']
    customer_id = lics['customer_id']

    licenses.update(id, name, customer_id)

@eel.expose
def delete_licenses_py(id):
    id = int(id)

    licenses.delete(id)

#------------------ EQUIPMENT ----------------------

@eel.expose
def get_all_equipment_py():
    return equipments.findAll()

@eel.expose
def set_selected_equipment_py(id):
    global_vars['equipment_id'] = int(id)

@eel.expose
def get_selected_equipment_py():
    return equipments.findOne(global_vars['equipment_id'])

@eel.expose
def create_equipment_py(eq):
    equipments.create(name = eq['name'])

@eel.expose
def save_equipment_py(id, eq):
    id = int(id)

    name = eq['name']

    equipments.update(id, name)

@eel.expose
def delete_equipment_py(id):
    id = int(id)

    equipments.delete(id)

#------------------- CUSTOMER -------------------

@eel.expose
def get_all_customers_py():
    return customers.findAll()

@eel.expose
def set_selected_customer_py(id):
    global_vars['customer_id'] = int(id)

@eel.expose
def get_selected_customer_py():
    return customers.findOne(global_vars['customer_id'])

@eel.expose
def create_customer_py(customer):
    customers.create(name = customer['name'])

@eel.expose
def save_customer_py(id, customer):
    id = int(id)

    name = customer['name']

    customers.update(id, name)

@eel.expose
def delete_customer_py(id):
    id = int(id)

    customers.delete(id)

#-------------------- OBJECT & DOCUMENT ---------------------

@eel.expose
def get_all_objects_py():
    return objects.findAll()

@eel.expose
def get_document_type_py():
    return global_vars['document_type']

@eel.expose
def create_document_py(obj_id, equipment_list, doc_type):
    obj_id = int(obj_id)

    obj = objects.findOne(obj_id)
    lics = licenses.findByCustomer(obj['customer_id'])

    if lics is None:
        lics = "Пусто"
    else:
        lics = lics['name']
    
    if doc_type == "act":  
        result = doc.create_act_document(equipment_list, obj, lics)

        return result
    elif doc_type == "passport":
        result = doc.create_passport_document(equipment_list, obj)

        return result

    
@eel.expose
def follow_document_py(obj_id, doc_type):
    global_vars['document_type'] = doc_type
    global_vars['object_id'] = int(obj_id)

@eel.expose
def create_object_py(obj):
    name = obj['name']
    address = obj['address']
    customer_id = int(obj['customer_id'])

    objects.create(name, address, customer_id)

@eel.expose
def save_object_py(id, obj):
    id = int(id)
    name = obj['name']
    address = obj['address']
    customer_id = int(obj['customer_id'])

    objects.update(id, name, address, customer_id)

@eel.expose
def get_selected_object_py():
    id = int(global_vars['object_id'])

    return objects.findOne(id)

@eel.expose
def set_selected_object_id_py(id):
    global_vars['object_id'] = int(id)

@eel.expose
def get_selected_object_id_py():
    return global_vars['object_id']

@eel.expose
def delete_object_py(id):
    id = int(id)

    objects.delete(id)


eel.init('web')
eel.start('./pages/customer/customers.html', mode = "yandex", size=(800, 800))

