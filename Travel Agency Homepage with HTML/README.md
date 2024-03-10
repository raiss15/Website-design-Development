[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/ypgcUUs_)


# Travel Agency Homepage

This project is a front-end design for a travel agency's homepage. It is built using HTML and showcases various sections including a navigation bar, search functionality, service highlights, promotions, client testimonials, and a footer with additional links and a newsletter subscription form.

## Features

- **Navigation Bar**: Includes links to Home, About, Services, Booking, Upcoming Packages, and a 'Get In Touch' button.
- **Main Banner**: A large header image with a logo and a tagline.
- **Search Functionality**: Allows users to search for destinations with options for travel type and duration.
- **Service Highlights**: Showcases various travel services like guided tours, flight options, religious tours, and insurance.
- **Promotions**: Highlights special deals or packages.
- **Client Testimonials**: A section for showcasing client feedback with navigational arrows.
- **Footer**: Contains additional navigation links, social media icons, and a newsletter subscription form, set against a background image.

## Structure

### Header

- Contains the website's logo and main navigation menu.
- The navigation menu includes links to different sections of the website and a 'Get In Touch' button.
- The header image (`bgimg1.jpeg`) is not displayed due to the incorrect usage of the `<span>` tag. To display this image, an `<img>` tag should be used instead.

### Main Section

- Includes a search form for destination lookups.
- Displays a notification about the popularity of a specific event (Tomorrowland).
- Showcases partner logos.

### Services Section

- Highlights different services offered by the travel agency.
- Each service is represented with an icon and a brief description.

### Promotion Section

- Showcases special promotional offers.
- Includes a large image and descriptive text.

### Client Testimonials

- Displays client testimonials.
- Includes left and right navigation arrows for browsing through multiple testimonials.
- Features a horizontal line created using the `<hr>` tag.

### Footer

- Divided into four parts: Logo and company description, company's inner pages, destination highlights, and newsletter subscription.
- Each part is organized in a separate column.
- The footer includes social media icons and copyright information.

## Documentation

- `<!DOCTYPE html>`: Defines the document type and version of HTML.
- `<html lang="en">`: Root element of the HTML document and specifies the language as English.
- `<head>`: Contains meta information, title of the document.
- `<body>`: Contains the content of the HTML document.
- `<header>`, `<section>`, `<div>`, `<span>`: Used for structuring and grouping content.
- `<nav>`: Defines a set of navigation links.
- `<img>`: Embeds images in the document.
- `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<p>`: HTML heading and paragraph tags for text content.
- `<form>`: Defines a form for user input.
- `<input>`: Used to create interactive controls for forms.
- `<select>` and `<option>`: Used for creating a drop-down list.
- `<button>`: Defines a clickable button.
- `<a>`: Defines a hyperlink.
- `<footer>`: Represents the footer of the document, typically containing authorship, contact information, etc.
- Inline CSS (`style` attribute): Used for styling individual HTML elements.

## Notes

- The HTML code uses inline CSS for styling. For more complex applications, external CSS is recommended for better organization and maintainability.
- The code structure can be improved for better readability and maintainability, such as properly closing tags and avoiding unnecessary nested `<div>`s and `<span>`s.
- Some semantic HTML elements could be utilized more effectively for better accessibility and SEO.
 