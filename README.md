# Crisol de Cuerda's Website

This is the repository with the code for [Crisol de Cuerda](https://www.crisoldecuerda.com)'s website. The application is built using Next.js. The code is generated using [markdown](https://www.markdownguide.org/basic-syntax/) files for the text content and configuration [yml](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html) files for the dynamic content.

## Structure of the repository

<details>
  <summary>Here you can find a description of each folder in the repository</summary>

```
└── 📁crisolWebsite
  └── 📁.github/workflows/cd.yml    -> Deployment workflow. Triggers when a new release is
  |                                    generated and deploys automatically to our hosting.
  |                                    It builds the application and starts the server for
  |                                    the SSR
  └── docs              -> Images used in the Readme section
  └── 📁src             -> The source code of the application
    └── 📁components    -> Components for the UI
    └── 📁config        -> Configuration files. A set of yml files that contain the
      |                    configuration of the different sections of the application.
      └── config.yml    -> General purpose configuration: the start and end date for this
      |                    year's edition, parameters for our registration process, links
      |                    to our social media, etc
      └── crisolBookIndex.yml  -> The index of the Crisol book. Used in the table displayed
      |                           on the /crisol-book page
      └── indexPage.yml        -> Text content for the home page. Literals for the buttons
      |                           and links
      └── media.yml            -> config for the /media page. Literals, links for the videos
      |                           and photo album
      └── menu.yml             -> Literals for the navigation menu
      └── teachers.yml         -> Teachers configuration, includes name, id, instruments,
      |                           years and media for each teacher
      └── translations.yml     -> General purpose translations in the application.
    └── 📁content            -> Markdown content of the app. Follows the router structure
      |                         and contains one folder for English and another for Spanish
      |                         with identical structure. The content of the files is
      |                         converted to the HTML displayed in the website. Some files
      |                         contain meta information with the pictures, links and other
      |                         necessary elements to render.
      └── 📁en
        └── 📁about
        └── ...
        └── 📁teachers
          └── 📁bios
            └── alasdair_fraser.md   -> use the teacher's id as the file name. They contain
            |                           the text displayed in each teacher's biography.
            └── ....
      └── 📁es
    └── 📁hooks         -> React custom hooks for the app
    └── 📁pages         -> Pages tsx files
      └── _app.tsx      -> Global layout of the application
      └── index.tsx     -> Home page
      └── ....
    └── 📁styles        -> Global styles of the app. Most pages contain their own stiles.
        |                  The Globals.css file contains a css reset definition.
        └── globals.css
        └── home-page.tsx
    └── 📁types         -> Typescript definition
        └── Teacher.ts
        └── constants.d.ts
    └── 📁utils         -> Several utility functions
        └── baseUrl.ts
        └── getContent.ts
        └── getPhotos.ts
        └── parseTemplate.ts
  └── .eslintrc.json   -> Linting and other configuration files
  └── ....
```

</details>

## How can I modify the content?

To modify the content of the website, you need to know if you want to change the configuration of some parameters or the text of one of the sections. You can search for the text that you want to modify and Github will provide a list of the files where the content appears.

![search box in github](/docs/search.png)

1. Once you have located the file that you want to edit, you can edit it online by clicking in the edit button:

![edit the file](/docs/edit_files.png)

2. Make your changes to the file content and click on "Commit changes":

![commit changes](/docs/make_changes.png)

3. A popup window will appear. You can change the commit message or leave the default one. It's good practice to also include a description of your changes to have traceability in the future. You can commit your changes directly to `main` and click "Commit changes"

![commit popup](/docs/commit_changes.png)

4. Your changes are done and you will see that your commit message appears in the main page:

![commit saved](/docs/commit_saved.png)

You can repeat the steps 1 to 4 for every file that you want to modify and as many times as you need.

Once you've done all the changes, you will have to release the code to the live website.

## Publishing a new version

Publishing a new version sounds fancy, but it's actually a simple process. A new version can include one small change or several changes at once.

Let's start by clicking on the "releases" link:

![releases](/docs/click_releases.png)

This will bring you to the releases page where you can see the content of the previous versions. You'll have to click on "Draft a new release":

![draft new release](/docs/draft_release.png)

I here you'll have to fill 2 things: a version number, and the release content.

The version number can be set in the tag box:

![generate new tag](/docs/generate_new_tag.png)

You'll notice a list of all the previous tags. When creating a release we want to make sure that we generate a **NEW** tag. Tags must be sequential and follow a specific convention. For content changes, you only have to increase the last number. So if the last tag is 0.3.4, the next sequential number would be 0.3.5

There is no limit to how many digit each number can have, so 12.158.1621 is a valid version number if the previous value was 12.158.1620.

![about version numbers](/docs/about_tag_numbers.png)

Now that you've selected the new version, you have to provide a title and a description of the release. The title is just a headline. It's recommended that the description includes a list of all the changes that you have done. The content of the description is a markdown, so you can write a lot of text or include bullet points. Up to you.

![edit release content](/docs/edit_release_content.png)

Once you're dont, click on "Publish release" and your job is done!

If you want to monitor the release process, you can check the actions tab. A process will be running while the changes are uploaded. Once it's finished, you will be able to see the changes on the website.

![release action](/docs/release_action.png)
