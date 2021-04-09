export default {
  language: 'pt-br',
  height: 100,
  extraPlugins: 'copyformatting,colorbutton',
  removePlugins: 'elementspath,imagebase,image2,easyimage',
  removeButtons: 'Image',
  uiColor: '#E8E4E4',
  resize_enabled: false,
  toolbarGroups: [
    {
      name: 'basicstyles',
      groups: ['basicstyles']
    },
    {
      name: 'colors',
      groups: ['colors']
    },
    {
      name: 'paragraph',
      groups: ['list', 'indent', 'blocks', 'align', 'bidi']
    },
    {
      name: 'styles',
      groups: ['styles']
    },
    {
      name: 'clipboard',
      groups: ['clipboard', 'undo']
    },
    {
      name: 'links',
      groups: ['links']
    },

    /*
    {
      "name": "document",
      "groups": ["mode"]
    },//*/
    {
      name: 'insert',
      groups: ['insert']
    },

    {
      name: 'editing',
      groups: ['find', 'selection', 'spellchecker', 'editing']
    }

  ],
  //*/
};
