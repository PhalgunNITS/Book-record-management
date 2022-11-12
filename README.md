# Book-record-management

This ia a book recoad management API backend for the management of books.

# Routs and End points

## /usres
Post: Create a new user 
Get: Get all list of users 

## /users/{id}
Get: Get a user by ID 
Put: Update a user by ID
Detete: Delete a user by ID (Check if he/she still has an issued book.) (Is there any fine to be paid.)

## /usres/subscription-detailes/{id}
Get: Get subscription detailes
1. Date of subscription
2. valid till
3. Fine if any

## /books
Get: Get all books
Post: Create/Add a new book

## /books/{id}
Get: Ga=et a book by ID
Put: Update a book by ID

## /books/issued
Get: Get all issued issued/by-user

## /books/issued/withFine
Get: All issued books with fine

# Subscription Type
Basic (3 monthes)
Standard (6 monthes)
Premium (12 monthes)

If the subscriptiondate is 12/11/2022 and subscription type is Standerd the valuid till date be 12/05/2023

If he has an issued book and issued book to be returned at 12/06/2023 and he return it, then he gets a fine of Rs. 100/-

If he has an issued book and the issued book is tobe returned at 12/06/2022
If he missed the date of return, and his subscription also expires, then he will get a fine of Rs. 200/-