# Data crossing boundaries enlarge codebase

## TL,DR
By the book:
- each layer communicates only data to the next inner layer
- loose coupling: no change ripples
- it is very verbose and repetitive

Custom:
- all layers communicate with the same object: the Entity
- strong coupling, especially between use-case
- much mess code

## In details 

### By the book

#### What to do

> Typically, the data that crosses the boundaries is simple data structures. 
> You can use basic structs or simple Data Transfer objects if you like. 
> Or the data can simply be arguments in function calls. 
> Or you can pack it into a hashmap, or construct it into an object. 
> The important thing is that isolated, simple, data structures are passed across the boundaries. 

#### What happened if you don't

> We don’t want to cheat and pass Entities or Database rows.
> We don’t want the data structures to have any kind of dependency that violates The Dependency Rule.
> For example, many database frameworks return a convenient data format in response to a query.
> We might call this a RowStructure. We don’t want to pass that row structure inwards across a boundary. 
> That would violate The Dependency Rule because it would force an inner circle to know something about an outer circle.
> So when we pass data across a boundary, it is always in the form that is most convenient for the inner circle.

### Problem implementation

#### Overview

The application is a vehicle registration:
- POST /car to registrate
- GET /car to query
- GET /reporting for an external partner  
 
Database structure is significantly different from entity structure, eg. `Car` entity is stored in `Vehicle` table.
Database gateway can use database client or ORM.

#### Project structure

We store each layer in a folder named after [the schema](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
- framework-drivers
- interface-adapters
- use-cases
- entities

We also use `RowStructure` for the data returned by a database client or ORM.

#### Javascript

If not using Typescript, you can use as data structure in parameter/return value:
- variable; 
- JS object literal;
- instance of a JS class without behaviour.

We chose here JS object literal: 
- to keep code compact (JS classes would be verbose);
- to prevent error by enumerating fields.

The rules boil down to:
- no component may instantiate an entity but a use-case
- the following layers receive a DS and return a DS
  - controller
  - gateway
  - use-case
- a DS should include no behaviour (code), only state

#### Java

Data structures have been implemented using instance classes.
These classes have no behavior, just state in public instance variables.
They're not [POJO](https://martinfowler.com/bliki/POJO.html).

They have no dependency toward framework, so:
- didn't inherit from any classes;
- didn't compose any framework classes.
