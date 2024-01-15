# An HTML Document
For this lab, we will embark on a virtual journey by creating 3 travel-inspired HTML pages. While we may not leave our desks, we'll travel far and wide in our imagination!

Unlike our previous node-based labs, this one will solely focus on HTML. 

The major concepts of this lab are:

- Making data-centered HTML Documents
  - Thinking in terms of describing our data, without care for the visual aspect
  - Focusing on structure and semantical validity.
- Writing valid HTML
  - [Your HTML must be valid](https://validator.w3.org/#validate_by_input) to an external site. or you will lose points on the assignment.
- Linking between pages
  - You will use a basic navigation structure (see below) on each page to link to all the pages you are writing.

## Starting an HTML Document
Your HTML documents should start with the following format. This is a basic, valid, HTML document structure. Your content goes inside of the body tags.

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>title</title>
  </head>
  <body>
    <!-- page content -->
  </body>
</html>
```
# Navigation Structure
Each page should include a navigation that links to ALL other pages (including the page you're on. When you're on the Home page for example, there is still always a navigation item for "Home" even when you're already on the home page)

These links will come in the form of the following setup (this code is not complete; you should describe each page, give the anchors relative file locations, etc!):

```HTML
<header>
  <nav>
    <ul>
      <li><a>Page 1</a></li>
      <li><a>Page 2</a></li>
      <li><a>Page 3</a></li>
    </ul>
  </nav>
</header>
```

# About the content
While the content is fictional or personal, it should be written in a format as if it was a real travel experience.

## index.html
In index.html, you will write a document describing the places you have traveled to. In this document you will:

- Include an ```h1``` tag with Title of the page: "My Travel Destinations". You should also include a similar description in your ```title``` tag.
- Create a ```main``` element with several ```article``` tags inside of it; each article will have a heading (h2level) with the destination name, and one or two ```p``` elements describing the place and your experience or reasons to visit.

Your article elements will contain:

1. h2 with the destination name.
2. A short, 1-2 paragraphs describing the place and your experience or reasons to visit (in P elements).
3. An ordered list ```ol``` of your favorite places to visit in that destination, ranked by how much you like each place.

## journal.html
In journal.html, you will write a document that is your travel journal. In this document you will:

- Include an h1 with the value: "My Travel Journal"  You should also include the same value in your title tag.
- Create a main element with many section tags inside of it. Each section will contain a journal entry. Each section element should have the following:

1. An h2 that has the title of the journal entry
2. An cite element that has the date/time of the journal entry.
3. Your journal entry should be at least one p element but can include more than one.
4. Inside an aside tag that has the name of the destination that journal entry belongs to

## tips.html
In tips.html, you will write a document giving travel tips.

- Include an h1 tag with the text: "Travel Tips and Tricks" You should also include a similar description in your title tag.
- Create a main element, inside the main element you will have an ordered list olof travel tips, that will have several list item elements from the most to least important.
- for each list item li element you will nest inside it an h3 element with the title of the tip and one or two paragraphs p describing the tip in detail. Again, this h3 and p elements should be nested inside the li element. 

# General Requirements
1. [Your HTML must be valid](https://validator.w3.org/#validate_by_input) or you will lose points on the assignment.
2. Your HTML must make semantical sense; usage of tags for the purpose of simply changing the style of elements (such as i, b, font, center, etc) will result in points being deducted; think in terms of content first; style is done in CSS, not your HTML!
3. You can be as creative as you'd like to fulfill front-end requirements; if an implementation is not explicitly stated, however you go about it is fine (provided the HTML is valid and semantical). Design is not a factor in this course.
4. You will zip up all three files and submit then zip. Name the zip LastName_FirstName_Section.zip
