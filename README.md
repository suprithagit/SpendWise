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

Add Expenses: Easily add new expense entries with details like category, amount, description, and date.

View Expenses: See a complete list of your recorded expenses.

Filter Expenses: Filter expenses by day, week, month, or a custom date range.

Search Expenses: Search and filter expenses based on category.

Edit Entries: Modify existing expense records with updated details.

Delete Entries: Remove unwanted or incorrect expense entries.

Summary: Get a quick overview of your total spending and identify your biggest spending category.

Category Breakdown: Visualize your spending distribution across different categories using a pie chart.

🛠️ Technologies Used

🔙 Backend
Java 21
Spring Boot
Spring Data JPA
Hibernate
RESTful Web Services

🌐 Frontend
HTML5
CSS3 (with Bootstrap 5)
JavaScript
Thymeleaf (Templating Engine)
Chart.js (for pie chart visualization)

🗄️ Database
   MySQL

✅ Prerequisites
Make sure you have the following installed on your system:

Java Development Kit (JDK) 21 or later

Maven (or Gradle if you are using it)

MySQL Server

A modern web browser

Before you begin, ensure you have the following installed:Java Development Kit (JDK) 21 or laterMaven (or Gradle if you are using Gradle)
MySQL ServerA modern web browserSetup and InstallationClone the Repository:
git clone <repository_url> # Replace <repository_url> with the actual URL
cd SpendWise

Database Setup:Connect to your MySQL server.
Create a new database for the application.CREATE DATABASE spendwise_db;

Note down your MySQL username and password.Configure application.
properties:Navigate to src/main/resources.

Open the application.properties file.
Update the database connection details with your MySQL configuration:

# Database Configuration (MySQL Example)
spring.datasource.url=jdbc:mysql://localhost:3306/spendwise_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update 

# 'update' will create/update tables based on entities. Use 'create' or 'create-drop' for fresh starts.
spring.jpa.show-sql=true 

# Log SQL statements
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Specify MySQL dialect
Replace your_mysql_username and your_mysql_password with your actual credentials. Ensure the database name in the URL matches the one you created.
Build the Project:Open a terminal in the project's root directory.Build the project using Maven:
mvn clean install
This will download dependencies and build the application JAR file.Running the ApplicationFrom the project's root directory, run the Spring Boot application using Maven:
mvn spring-boot:run
Alternatively, you can run the generated JAR file:java -jar target/SpendWise-0.0.1-SNAPSHOT.jar

# Adjust the JAR name if necessary
The application will start on port 8080 by default.
UsageOpen your web browser and navigate to http://localhost:8080/.
You will land on the welcome page. 
Click the "TrackIt" button to go to the expense tracker page.On the tracker page, you can:Use the form to add new expenses.
View your expenses in the table.Use the filters and search bar to narrow down the displayed expenses.
Click the "Edit" or "Delete" buttons for individual expense entries.See the summary and category breakdown chart.
Future EnhancementsUser Authentication and AuthorizationMore advanced reporting and analyticsExporting expense data (e.g., to CSV)
Support for multiple currenciesAdding income trackingImproved mobile responsivenessLicense.

## 📸 Screenshots 

1. HomePage : http://localhost:8080/
![image](https://github.com/user-attachments/assets/aa664246-6135-441c-a046-98aa010e03ca)

2. SpendWise Tracker: http://localhost:8080/tracker
   ![image](https://github.com/user-attachments/assets/97991a91-1c49-4223-a800-225b1d8098f9)
   ![image](https://github.com/user-attachments/assets/16aeff74-dafb-4273-a051-5656976f06d9)

   



