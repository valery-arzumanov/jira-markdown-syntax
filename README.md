# JIRA Markdown Syntax

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/valery-arzumanov/jira-markdown-syntax/master/LICENSE)

- [Preamble](#preamble)
- [Design goals](#design-goals)
- [Functionality](#functionality)
    - [Defined scopes](#defined_scopes)
    - [Item folding](#item-folding)
    - [Snippets](#snippets)
- [Limitations](#limitations)

## Preamble
There occur certain situations, when it is necessary to write an issue description in Jira, using text mode instead of the visual one (e. g., an attempt to put monospaced text inside `{color}` tags leads to incorrect rendering). However, doing it via Jira interface or in a text editor is uncomfortable, because no syntax highlight is provided and plain text, structured this way, is very difficult to analyze.

## Design goals
This VS Code extension serves as a Jira markdown parsing module, based upon [TextMate rules](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide). As long as Jira markdown looks far different from text markdown and programming languages syntax, about a third of the scopes defined within the extension framework are not covered by themes — the colors are supposed to be defined separately — e. g., in `"editor.tokenColorCustomizations"` entry of user settings; defining a whole new theme seems to be overkill for the task.

## Functionality
### Defined scopes
The scopes are defined for almost all of the items, described [here](https://jira.atlassian.com/secure/WikiRendererHelpAction.jspa?section=all), except for the following:
- line breaks (`\\`)
- horizontal rulers (`---`)
- em and en dashes (`---`, `--`)
- character escapes (`\X`)
- graphical emoticons (smileys)

For _"composite"_ items the scopes are defined for both the tags and the inner content — these are:
- quotations (`{quote}`)
- code blocks (`{code}`)
- panels (`{panel}`)
- preformatted text blocks (`{noformat}`)
- colored text blocks (`{color}`).

Additionally, there is a scope for the language of code blocks and a scope for the color hex notation of colored text blocks.

The only item, which is _"scoped"_ in partial fashion, is the table. For this element only the header has its own scope.

There are also 3 items, which are not directly mentioned on Atlassian site, but they may also come in handy — these are:
- strings (`"string"`)
- attribute name-value pairs (`bgColor=#ccc`): scopes are defined both for the name of an attribute and for its value
- separators (`|`, `=`, `^`, `:`, `/` and `,`): these are used within the tags of _"composite"_ items, table markup and attachments

### Item folding
The items, the content of which is supposed to take up several lines (including the tags), support folding. These are quotations (`{quote}`), code blocks (`{code}`), panels (`{panel}`) and preformatted text blocks (`{noformat}`). It does not matter whether they have attributes or not — the folding works anyway.

### Snippets
The extension provides several snippets. They may be divided in two groups: _standalone_ and _attachable_.

_Attachable_ snippets are supposed to be used on a portion of text, selected by user. However, it is not an inescapable requirement — if no text is selected, the tags or markers will still be added, but there will be nothing between them; otherwise they will surround the selection. These include all of the above-mentioned _"composite"_ items as well as monospaced text blocks and citations.

_Standalone_ snippets, on the contrary, require no selection — they will be inserted in-place if the corresponding command is executed. Moreover, if there is text selected, it will be **replaced** with a snippet (attention!). These include table templates and attribute-value pairs.

## Limitations
There exist certain downsides. It seems noteworthy to enumerate them:
1. About a third of colors and styles are needed to be defined manually, as it has been already mentioned above.
2. Indentation folding is **not** supported, as long as the folding model is defined differently. However, it may be considered appropriate, as long as only one of the two approaches based on the complexity and specific requirements of the folding logic is typically chosen.
3. Nesting of items mostly will not affect syntax highlight, but if a quotation happens to be inside the panel, for instance, only the rule for the topmost scope will be applied.