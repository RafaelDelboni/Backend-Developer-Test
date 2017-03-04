# Backend Developer Test

## Assignment 1: Port old PHP code to Node.JS

In this exercise we have an example database structure and some models which represend them. Included in this exercise is a SQLite3 database (and source files), PHP models and some extra PHP application code.

The task is to setup a small Node application with:
* a representation of the same models
* the application code with the same behaviour as the original PHP code

Make sure you port the following files in to a Node application:

* `assignment1/php/index.php`
* `assignment1/php/classes/Model/Booker.php`
* `assignment1/php/classes/Model/Booking.php`
* `assignment1/php/classes/Model/BookingItem.php`
* `assignment1/php/classes/Model/Item.php`
* `assignment1/php/classes/Model/Product.php`
* `assignment1/php/classes/Model/Space.php`
* `assignment1/php/classes/Model/User.php`
* `assignment1/php/classes/Model/Venue.php`
* `assignment1/php/errors.php` (if applicable)

Your resulting Node application should be placed in `assignment1/node/`. You can of course use dependencies. You can either choose to write custom SQL queries or use an ActiveRecord like library to represend your data. Make sure you pick a solution which is easily maintainable. If special software is needed to run the code make sure this is documented.

Notes:

1. Your Node application should be a standalone HTTP server.
