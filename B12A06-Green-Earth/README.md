# Green Earth - Plant a Tree Campaign

A responsive web app for a tree-planting campaign. Browse trees, view details, add to cart, and see your impact!

---
## 📚 Q&A

### 1. What is the difference between `var`, `let`, and `const`?

- **var** is funtion-scoped. A var variable is accessible anywhere within the function where it's decared, even if declared inside a block. It can be redclared or reassigned, hoisted .

- **let:** is block-scoped . It is only accrssible within the specific block of code where they are defined. It can be reassigned but not redclared in same scope.

- **const:** is block-scoped . It is also only accrssible within the specific block of code where they are defined . It can be cannot be reassigned or redeclared. Must be initialized.
---


### 2. What is the difference between `map()`, `forEach()`, and `filter()`?

- **map():** iterates over each element in an array and executes a provided callback function for each element and returns a new array with transfered elements.

- **forEach():** iterates over each element in an array and executes a provided callback function for each element and return `undefined`.It don't create a new array or modify the original array .

- **filter():** creates a new array containing only the elements from the original array that satisfy a specific condition . 


### 3. What are arrow functions in ES6?
Arrow functions are a new way to write fuctions in JavaScript , introduced in ES6 . They offer a more concious syntax compare to traditional function expressions and handle `this` keyword differently.

```javascript
cosnt multiple = (x,y)=>x*y;
```

### 4. How does destructuring assignment work in ES6?
Destructuring assignment in ES6 is a JavaScript expression that allows you to unpack values from arrays, or properties from objects, into distinct variables.

- **Array Destructuring** we use square brackets [] on the left-hand side of an assignment to declare variables that will receive values from an array on the right-hand side.The variables are assigned based on their position (index) in the array.
```javascript
const [a,b,c] = [54,564,984];
```

- **Object Destructuring** we use curly braces {} on the left-hand side of an assignment to declare variables that will receive properties from an object on the right-hand side.The variables are assigned based on matching property names.
```javascript 
const {name,age} = {name:"Masud",age:24};

```

### 5. Explain template literals in ES6. How are they different from string concatenation?

Template literals are strings enclosed by backticks (`` ` ` ``) instead of single or double quotes.We van embed variable or JavaScript expressions directly within the string using the ${} syntext.
```javascript
const welcomeMsg = `Welcome ${name} in programming world.`
```
It also support multi-line strings and are more readable . 
```javascript 
const multiLines = `This is first line .
And this is second line of code `
```


## 🌴 API Endpoints
---
- **Get 🌴All Plants**
```bash
https://openapi.programming-hero.com/api/plants
```

- **Get 🌴All categories**
```bash
https://openapi.programming-hero.com/api/categories
```

- **Get 🌴plants by categories**
```bash
https://openapi.programming-hero.com/api/category/${id}
```

```bash
https://openapi.programming-hero.com/api/category/1
```

- **Get 🌴Plants Detail**

```bash
https://openapi.programming-hero.com/api/plant/${id}
```

```bash
https://openapi.programming-hero.com/api/plant/1
```
---




## ✅ Main Requirements 

1. **Navbar**

   - Logo/name (left)
   - Menu items (center)
   - "Plant a Tree" button (right)
2. **Banner**
   - Background image
   - Title & subtitle
   - Centered button
3. **About Campaign** 
   - Background image
   - Title & subtitle
   - Centered button  

4. **Our Impact Section**
   - Section heading
   - Image (left), text (right)  

5. **Plant a Tree Today & Footer** 
   - Form: Name, Email, Number of Trees
   - Footer with copyright 

6. **Responsiveness**
   - Mobile-friendly design 
---



## ⚙️ Functionalities

- **Category Loading:**  
  Loads tree categories dynamically (left sidebar).
- **Category Click:**  
  Loads trees for selected category.
- **Card Layout:**  
  3-column responsive grid.
- **Card Contents:**  
  Image, name, description, category, price, Add to Cart button.
- **Modal:**  
  Click tree name for full details in modal.
- **Add to Cart:**  
  Adds tree to cart, shows name.
- **Total Calculation:**  
  Calculates total price in cart.
- **Remove from Cart:**  
  ❌ button removes tree and updates total.
- **Loading Spinner:**  
  Shows spinner while loading data.
- **Active Button State:**  
  Highlights selected category.

---

## 🧪 Challenges

- Add to Cart
- Total Calculation
- Remove from Cart
- Loading Spinner
- Active Button State

---

## 🧰 Technology Stack

- HTML
- CSS (Tailwind/DaisyUI)
- JavaScript (Vanilla)

---

## 📱 Responsive Design

Works on mobile and desktop.

---

## ©️ Copyright

Green Earth Campaign &copy; 2025. All rights reserved.