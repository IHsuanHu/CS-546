# Palindrome/Prime Checker
For this lab, you will be using HTML, CSS, and JavaScript on the user's browser to make a simple Palindrome/Prime Checker!

You will create an express server with a single page at the location / that will provide the user with a web page to allow them to enter some text separated by a comma. The entire checking operation will be done using client-side JavaScript. Major points will be deducted if you perform the processing server-side.

A palindrome is a phrase that is spelled the same way, backwards and forwards (ignoring spacing and punctuation). For example, the following phrases are palindromes:

- Madam
- Was it a cat I saw?
- He did eh?
- Go hang a salami I’m a lasagna hog.
- Poor Dan is in a droop

You will create an express server with a single page at the location ```/``` that will provide the user with a web page to allow them enter a number of terms separated by a comma and check if each one is a palindrome.  For example, the user would enter the following input into the form: red rum sir is murder, taco cat, mom, pat

The entire checking operation will be done using client-side JavaScript.

# The Server
Your server this week should not check for palindromes! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the palindrome checking page.

# The Whole Palindrome Checker Application ```/``` 
Your page should have a few basic user interface elements:

- A header tag, with an h1 naming your site, with a title for your page
- A footer with your name, student ID, and any other info about yourself you wish to include
- A single ordered list with an id of ```palindromes```. 
Your page will have a form with the following:

- An input with type of text and with the ```name``` attribute set to ```palindrome_input``` and the ```id``` attribute set to ```palindrome_input``` as well
- A buttom to submit the form (make sure this is a button and not an input!)
Using JavaScript in your browser only, you will listen for the form's ```submit``` event; when the form is submitted, you will:

- Get the value of the input
- Lowercase the text
- Strip all non alphanumeric text; this includes spaces and any other punctuation (besides commas since they are the delimiters). For example, ```Hello 2 the world!.......``` becomes ```hello 2 the world!``` when lowercased and then ```hello2theworld``` when stripped of all non alphanumeric text.
- For each word/phrase, determine whether it is a palindrome or not. If it is, you will add a true boolean to an array. If it is not, you will add a false boolean to the array. 
- Next, add up the number of booleans (the number of elements in the array) and determine whether the count is a prime number.
- Then, add the array from the results of your palindrome checking as a list item ```<li>``` to the ```#palindromes``` ```<ol>``` list. This list item should have a class of #prime and be colored green with hex code: ```#00ff00``` if the count/array length was prime, and #not-prime and be colored red with a hex code of ```#ff0000``` if it is not prime. If the user does not have a value for the text input or the value of the text input is all spaces when they submit, you should not continue the palindrome checking and instead should inform them of the error by displaying a p element on the page with a class of "error".  The text of the error p tag is not important but you should be deceptive about what the error was.

So for example, if the user inputs "cat, dog, racecar" the array would be [false, false, true] and prime. While there can be punctuation in the word/phrase, you can assume that there will not be any commas in the test cases, meaning, the commas will only count as a delimiter for each word/phrase and will not be contained in the inputted word/phrase. 

Also check for Palindromic numbers when doing the palindrome check! For example if the following was inputted: ```44, 121, 202, MoM, taco cat!!!!, book, 1oo1, 1bob1``` you would return ```[true,true,true,true,true,false,true,true]```

# The style
You will style your page using at least 5 CSS selectors for general CSS styling. You will place the CSS in its own file.

You must style the ```prime``` class to make text have a ```color``` of ```#00ff00``` and ```not-prime``` class to make text have a color of ```#ff0000```.

```diff
- text in red
+ text in green
! text in orange
# text in gray
@@ text in purple (and bold)@@
```
An example of what the list would like on the page is: 

1. [false, false, true]
```json
2. [true, true, true, true]
```
3. [false, false, true, true, true]
4. [false, false, false, true, true, true, false]
5. [true, true, true, true, true, false]

# References and Packages
Basic CSS info can easily be referenced in the [MDN CSS tutorial](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started).

# Requirements
1. Al previous requirements still apply.
2. You must remember to update your package.json file to set ```app.js``` as your starting script!
3. Your HTML must be validLinks to an external site. or you will lose points on the assignment.
4. Your HTML must make semantical sense; usage of tags for the purpose of simply changing the style of elements (such as ```i, b, font, center```, etc) will result in points being deducted; think in terms of content first, then style with your CSS.
5. You can be as creative as you'd like to fulfill front-end requirements; if an implementation is not explicitly stated, however you go about it is fine (provided the HTML is valid and semantical). Design is not a factor in this course.
6. Your client side JavaScript must be in its own file and referenced from the HTML accordingly.
7. All inputs must be properly labeled!
