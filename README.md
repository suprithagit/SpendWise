# SpendWise

**SpendWise** - is a simple web application designed to help you track your daily expenses.


✨ Features

This application provides the following functionalities:
* Add new expense entries
* View a list of all expenses
* Edit or delete existing entries
* View summaries of total spending
* Visualize expenses by category using charts or graphs

## 📌 How It Works

* Add Expenses: Easily add new expense entries with details like category, amount, description, and date.

* View Expenses: See a complete list of your recorded expenses.

* Filter Expenses: Filter expenses by day, week, month, or a custom date range.

* Search Expenses: Search and filter expenses based on category.

* Edit Entries: Modify existing expense records with updated details.

* Delete Entries: Remove unwanted or incorrect expense entries.

* Summary: Get a quick overview of your total spending and identify your biggest spending category.

* Category Breakdown: Visualize your spending distribution across different categories using a pie chart.

# 🛠️ Technologies Used

🔙 Backend
* Java 21
* Spring Boot
* Spring Data JPA
* Hibernate
* RESTful Web Services

🌐 Frontend
* HTML5
* CSS3 (with Bootstrap 5)
* JavaScript
* Thymeleaf (Templating Engine)
* Chart.js (for pie chart visualization)

🗄️ Database
* MySQL

✅ Prerequisites
# Make sure you have the following installed on your system:

* Java Development Kit (JDK) 21 or later

* Maven (or Gradle if you are using it)

* MySQL Server

* A modern web browser


⚙️ Setup and Installation

🔽 Clone the Repository
🗄️ Database Setup : CREATE DATABASE spendwise_db;


# Properties

## Database Configuration (MySQL Example)
spring.datasource.url=jdbc:mysql://localhost:3306/spendwise_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

## JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update 
spring.jpa.show-sql=true 
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

🌐 Usage
1. Open your browser and go to: http://localhost:8080/
2. You will land on the Welcome Page.
3. Click the "TrackIt" button to go to the Expense Tracker page.
4. On the Tracker Page, You Can:
5. Use the form to add new expenses
6. View your expenses in a table
7. Use the filters and search bar to narrow results

## 📸 Screenshots 

1. HomePage : http://localhost:8080/
![image](https://github.com/user-attachments/assets/aa664246-6135-441c-a046-98aa010e03ca)

2. SpendWise Tracker: http://localhost:8080/tracker
   ![image](https://github.com/user-attachments/assets/97991a91-1c49-4223-a800-225b1d8098f9)
   ![image](https://github.com/user-attachments/assets/16aeff74-dafb-4273-a051-5656976f06d9)

   



