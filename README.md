# Dev Tools

https://dev-tools.deno.dev/

Dev-tools is an open source web based collection of online tools for use in software development.  The goals of these tools are:

* Provide a simple, easy to use interface
* Be lightning fast (score 100% in Lighthouse performance)
* Have a strong privacy and security focus
* Be accessible and responsive
* Be useful

## Tools
### Password Generator

Generate strong, secure passwords with multiple options for configurability.  Passwords are also checked against the _Have I Been Pwned_ API to see if they have been previoulsy exposed in a data breach.  If found, another is generated until the password is not found in a breach.

### Encoding/Decoding

Encode, decode and convert text to/from various formats.

### Formatting

Given data (e.g. JSON, XML, YAML) or code (e.g. Javascript, Typescript, GraphQL) or markup (e.g. Markup, HTML, CSS, Less, SCSS), format the code (using Prettier).  This also validates the structure of your code, data or markup.

### Diff

Given two sets of text, produce a visual display of the differences between them.

## Local Development

Ensure you have the latest version of Deno installed and start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

The site should now be available at http://localhost:8000/.

### Build Stack

Built using [Fresh](https://fresh.deno.dev/) and [Deno](https://deno.land/), deployed on [Deploy](https://deno.com/deploy).

There is no build step.  Commits to the main branch pushed to GitHub will automatically deploy to production.  Commits to a branch pushed to GitHub will deploy to a new URL for testing.

### Attributions
* Google's [diff-match-patch](https://github.com/google/diff-match-patch) library for text diff
* [ngx-text-diff](https://github.com/ABenassi87/ngx-text-diff) for diff rendering
* [xkcd](https://xkcd.com/936/) for password generation inspiration
* [Ace](https://github.com/ajaxorg/ace) javascript editor
* [Prettier](https://github.com/prettier/prettier) for code formatting 
* [He](https://github.com/mathiasbynens/he) for HTML entity encoding/decoding