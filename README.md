# challenge

This is just a small attempt as a NodeJS application that acts as a dropbox
with a bit of upload progress interaction.

I'm just learning Node so be aware this is terrible code.

## Design Decisions
* I picked NodeJS, because I've never used it before and wanted to learn. It also seems a reasonable choice for performance reasons (an uploader facility should generally be waiting a long time on IO) and in having a shared codebase between client and server (although that hasn't really happened here).
* Express was used as a web framework because it doesn't make sense implementing ALL of the routing/handling code from scratch.
* Formidable was used rather than the BodyParser middleware for handling the upload form, as you cannot dig into the form internals and data stream with a BodyParser object.
* Twitter Bootstrap was used for UI shiny things because it rocks.
* jQuery was used as I'm not insane.
