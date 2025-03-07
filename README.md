# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

HOW TO START A SVELTEKIT PROJECT: https://svelte.dev/docs/kit/creating-a-project
HOW TO ADD TAILWIND: https://tailwindcss.com/docs/guides/sveltekit

HW 1/23/25

- Add a button to clear the cart
- Move the cart to the right side, continue using the cards that we made
- Add a button somewhere on the cart items that removes the entire type of item from your cart
- When clicking on an image, display details about the image

HW 1/31/25
We've done the sorts of problems below in JS, but now let's repeat them using Svelte. Use knowledge from previous assignments but implement them in our new Svelte environment.

- Add a `category` field to your items. Add UI that allows the user to filter the catalog by those categories (bonus: do not hardcode the categories when allowing the user to select one to filter by - instead get the list of categories from the data itself)
- Add UI that allows the user to sort the catalog by price and name and also in reverse order.

PROJECT MODE:
Domain:

Virtual Grave (Embalmed or Decomposing)

- Schema
  - Deceased
    - ID (string)
    - Birth date (datetime)
    - Death date (datetime)
    - Name (string)
    - Family (string[])
    - Obituary (string)
    - Epitaph (string)
    - Achievements (string[])
    - Picture (byte[])
    - Cause of death (string)
    - Hobbies (string[])
    - Ideologies (string[])
    - Executor (string)
    - Enable comments (boolean)
  - Comments
    - ID (string)
    - Deceased (ID string)
    - Parent comment (ID string)
    - User (string)
    - Text (string)
- Features
  - View a person's virtual grave
  - See a list of public virtual graves
    - Sort and search
  - Create a virtual grave
    - For yourself (specify executor to update after death)
    - For another person
    - Publicize or keep private
  - Finalize and pay for virtual plot
  - Virtual reception (funeral home)
    - People can leave comments about the deceased (if enabled)
