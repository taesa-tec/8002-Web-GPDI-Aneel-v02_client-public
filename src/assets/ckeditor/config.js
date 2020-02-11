/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function(config) {
  // Define changes to default configuration here.
  // For complete reference see:
  // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

  // The toolbar groups arrangement, optimized for two toolbar rows.
  /*
  config.toolbarGroups = [
    { name: "clipboard", groups: ["clipboard", "undo"] },
    { name: "editing", groups: ["find", "selection", "spellchecker"] },
    { name: "links" },
    { name: "insert" },
    { name: "forms" },
    { name: "tools" },
    { name: "document", groups: ["mode", "document", "doctools"] },
    { name: "others" },
    "/",
    { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
    {
      name: "paragraph",
      groups: ["list", "indent", "blocks", "align", "bidi"]
    },
    { name: "styles" },
    { name: "colors" },
    { name: "about" }
  ];
  */

  config.language = "pt-br";
  config.height = 200;
  config.width = "100%";

  config.extraPlugins = "copyformatting,colorbutton,base64image,markdown";
  config.removePlugins = "elementspath,imagebase,image2,easyimage";
  //config.removePlugins = "elementspath,image2,easyimage";
  config.removeButtons = "Image";
  config.uiColor = "#E8E4E4";
  config.resize_enabled = true;
  config.resize_dir = "vertical";
  config.resize_maxHeight = 768;
  config.resize_maxWidth = "1024";

  config.toolbarGroups = [
    {
      name: "basicstyles",
      groups: ["basicstyles"]
    },
    {
      name: "colors",
      groups: ["colors"]
    },
    {
      name: "paragraph",
      groups: ["list", "indent", "blocks", "align", "bidi"]
    },
    {
      name: "styles",
      groups: ["styles"]
    },
    { name: "document", groups: ["mode", "document", "doctools"] },
    {
      name: "clipboard",
      groups: ["clipboard", "undo"]
    },
    {
      name: "links",
      groups: ["links"]
    },

    /*
  {
    "name": "document",
    "groups": ["mode"]
  },
  //*/
    {
      name: "insert",
      groups: ["insert"]
    },

    {
      name: "editing",
      groups: ["find", "selection", "editing", "lite"]
    },
    { name: "others" }
  ];

  // Remove some buttons provided by the standard plugins, which are
  // not needed in the Standard(s) toolbar.
  //config.removeButtons = "Underline,Subscript,Superscript";

  // Set the most common block elements.
  config.format_tags = "p;h1;h2;h3;pre";

  // Simplify the dialog windows.
  config.removeDialogTabs = "image:advanced;link:advanced";
  config.image2_maxSize = {
    height: 700,
    width: 700
  };

};
