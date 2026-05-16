


# IRA: The Heritage Archive 🕊️

> **A Bespoke Fashion Store Management System**  
> Developed by **Anushree H.S Jois** as part of the Full Stack Internship at Tap Academy, Bengaluru.

---

## 🏛️ Project Overview
**IRA (The Heritage Archive)** is a digital gallery and management system for high-end fashion artifacts and curated apparel. Moving away from noisy, cluttered traditional e-commerce layouts, IRA adopts a **Minimalist Editorial aesthetic**—treating product listings like museum archives or high-fashion lookbooks. 

The application architecture features a completely decoupled architecture, combining a high-performance **Java 21 / Spring Boot 3.2.x** backend with a fluid, responsive **React.js** single-page application.

---

## 🛠️ Tech Stack & Architecture

### **Backend Ecosystem**
*   **Language:** Java 21 (Leveraging Records, Pattern Matching, and Sealed Classes)
*   **Framework:** Spring Boot 3.2.x
*   **Security:** Spring Security & Stateless JWT (JSON Web Tokens)
*   **Data Tier:** Spring Data JPA, Hibernate ORM, MySQL Database
*   **Testing:** Postman API Suite

### **Frontend Architecture**
*   **Library:** React.js (Vite Build Tool)
*   **Styling:** Tailwind CSS (Custom Editorial Theme, Monochromatic Tones, Elegant Serif Typography)
*   **State Management:** React Context API (Global User Sessions & Bag Persistence)
*   **HTTP Client:** Axios (With Interceptors for Automatic JWT Injection)

---

## ⚙️ Core Modules & Features

### 🔒 1. Identity & Governance (Auth)
*   Secure signup and login flows utilizing `userMail` as the unique system identifier.
*   Password hashing using **BCrypt** before database commitment.
*   Stateless session control using robust **JWT architecture**, generating structured tokens passed securely via authorization headers.

### 🖼️ 2. The Gallery (Product Space)
*   Clean, zero-distraction layout showcasing luxury pieces categorized by **Men, Women, Kids, and Accessories**.
*   Real-time search filters querying localized text blocks without site lag.
*   Optimized data serialization handling circular JPA dependencies seamlessly via `@JsonIgnore`.

### 🛍️ 3. The Bag (Cart Subsystem)
*   Global state management built through **React Context**, bypassing prop-drilling completely.
*   Comprehensive option matrices allowing precise choices for high-fashion sizing (**S, M, L, XL**).
*   Session-backed client state tracking to avoid cart losses on incidental refreshes.

### 💳 4. The Editorial Checkout
*   Unified processing utilizing a structured `OrderRequest` DTO containing customer shipping info and multi-item lists.
*   Atomic database persistence mapping data smoothly across `orders` and `order_items` tables using ACID-compliant transactions.

---

## 🚀 Quick Start Guide

### **Prerequisites**
*   JDK 21 or higher
*   Node.js (v18+) & npm
*   MySQL Server 8.0+

### **1. Database Configuration**
Create a MySQL database named `ira_heritage`:
```sql
CREATE DATABASE ira_heritage;

```

Update your `src/main/resources/application.properties` configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ira_heritage
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.jpa.hibernate.ddl-auto=update
jwt.secret.key=YourSuperSecretAndLongSecureKeyForJWTSigningHere

```

### **2. Running the Backend (Spring Boot)**

```bash
# Navigate to root backend directory
./mvnw clean install
./mvnw spring-boot:run

```

The server will boot up and bind to `http://localhost:8080`.

### **3. Running the Frontend (React)**

```bash
# Navigate to frontend directory
cd frontend
npm install
npm run dev

```

Open your browser and navigate to `http://localhost:5173`.

---

## 🎯 Challenges Solved During Development

* **CORS & 401 Unauthorized:** Fine-tuned the `SecurityFilterChain` bean configurations within Spring Security to securely process pre-flight `OPTIONS` requests triggered by Axios cross-origin calls.
* **JPA Circular Mapping:** Mitigated infinite JSON recursion loops during deep bidirectional model serialization through appropriate mapping decorators (`@JsonIgnore` / `@JsonManagedReference`).
* **Vite HMR Freezes:** Resolved selective hot module reloading disruptions on development nodes by restructuring the asset bundling tree in `vite.config.js`.

---

## 🔮 Future Enhancements

* 💳 Live checkout support using **Stripe Payment Gateway**.
* 📊 Live inventory control and metrics reporting suite inside an dedicated **Admin Dashboard**.
* 🤖 **AI-Driven Stylist:** Curated look suggestions tailored to consumer history patterns.

---

*Developed with dedication by Anushree H.S Jois in collaboration with Tap Academy, Bengaluru.*

```

```
