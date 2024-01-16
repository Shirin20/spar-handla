## Title, Author, and Date
Title: Spar Handla  
Author: Shirin Meirkhan  
Date: 2022-06-04  

## Abstract  

This report discusses the work around Spar Handla, a web application built using the React framework. The application offers a price comparison service and the ability to save selected products in shopping lists. The application was developed through weekly iterations, with follow-ups in the form of standup meetings that took place at a new IT company each week. Positive experiences from the project were mainly how much I learned during the project. The timing and manner of testing the project were negative experiences. In conclusion, I am satisfied with the final product.  

## Introduction and Background
### Final Product   

Spar Handla is a web application that offers a price comparison service for food and products in grocery stores. It allows users to select products they need to buy and to add or remove them from various shopping lists. Each store has its own shopping list, and the lists are saved in the client so the user can access them even if the application is restarted. 

## Objective  

The goal of the project is to create a web application that shows products with prices from Stora Coop, ICA Maxi, and Willys in Kalmar. The goal was also for the application to be able to show products for all cities in Sweden by specifying the city where the user wants to shop. However, this had to be limited to one city to avoid fetching large amounts of data. The application is also planned to offer the possibility of saving the user's digital receipts.  

## Methodology  

The project was planned, documented, and developed over 10 weeks, totaling 400 hours.
The project started with writing the project's vision, which was used as a baseline for the project.
A backlog was created with some basic points from the vision. The backlog was expanded with new points and requirements, some of which were prioritized and others were adapted. The work during the project was planned weekly in sprints, i.e., standup meetings where one presented the parts of the work done the previous week and the parts planned for the next week.     



## Technology  

The application includes a back-end and a front-end. The back-end has a scraper built with Node.js.
The application's back-end has an API built with Express, a minimal and flexible Node.js web application framework with a myriad of HTTP utility methods that make it easy to create a robust API. Both parts are written in the JavaScript programming language.  
The front-end is built with React, a framework created by Facebook that helps to implement and structure components very well in both large and small projects. CSS and Bootstrap are used to style the front-end.   
The entire application development took place in Visual Studio Code, and EsLint and prettier-vscode are used for well-structured and readable code.  

## Implementation/Technology  

- [Node.js](https://nodejs.org/en/) 
- [Express](https://expressjs.com/)
- [JavaScript](https://www.javascript.com/)    
- [React](https://reactjs.org/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Bootstrap](https://www.bootstrapcdn.com/)  
- [Eslint](https://eslint.org/)   

## Positive Experiences   
One of the positive experiences is that I had the chance to learn React, which is one of the most used and most popular frameworks. I focused on React for four weeks of the entire application development, and it gave me a basic understanding of the framework. Another positive experience was that I learned many new scraping techniques and became more experienced with HTTP traffic. The biggest positive experience was that I was able to build an application from a thought on paper to a well-functioning web application.  

## Negative Experiences   
A mistake I made was not documenting everything as I made the application. This meant that the tests conducted during project development remained undocumented, which required more time at the end to remember and try to document in the best way. This in turn led to the time planned for automated testing being lost.
The most negative thing about the whole application is that it is built very dependent on the web scraper, which in turn is also dependent on how the grocery websites are built. This can cause the application to crash if the web scraper does not work as it should. This can be due to various factors, such as a store's website being updated and rebuilt in a new way.

## Summary:   
Even though I am not completely satisfied with how the project's testing went, I have learned how important it is to document and test from the beginning. The project was really fun, a lot to learn, and many challenges to overcome. During the course of the project, I expanded my knowledge about things I already knew and gained new knowledge about how to plan, start, and execute a project from start to finish. I will continue to develop the final product until it becomes as it was intended from the beginning.