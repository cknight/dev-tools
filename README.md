# Dev Tools

This is a work in progress and not yet ready for consumption

### Usage

Ensure you have the latest version of Deno installed and start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

The site should now be available at http://localhost:8000/.

### Build Stack

Built using [Fresh](https://fresh.deno.dev/) and [Deno](https://deno.land/), deployed on [Deploy](https://deno.com/deploy).

There is no build step.  Commits to the main branch will automatically deploy to production.

### Attributions
* Google's [diff-match-patch](https://github.com/google/diff-match-patch) library for text diff
* [ngx-text-diff](https://github.com/ABenassi87/ngx-text-diff) for diff rendering
* [xkcd](https://xkcd.com/936/) for password generation inspiration
* [Ace](https://github.com/ajaxorg/ace) javascript editor
* [Prettier](https://github.com/prettier/prettier) - code formatting 