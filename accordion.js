(function($R)
{
    var text='<form action=""><div class=\"form-item\">';
    var titre="titre accordéon";
    var y=0;
    var optionsmodal2 = {
        name: 'accordionform',
        title: 'accordionform',
        width: '800px', // optional, 600px by default
        height: '400px', // optional
        handle: 'save',  // optional, command which will be fired on enter pressed
        commands: // optional object
            {
                save: { title: 'Save' },
                cancel: { title: 'Cancel' }
            }
    };
    $R.add('plugin', 'accordion', {
        modals: {
            'accordion': '<form action="">'
            + '<div class="form-item">'
            + '<label>## accordion-label ##</label>'
            + '<input type="number" name="nombre_onglets">'
            + '<label>## titre-accordeon ##</label>'
            + '<textarea name="texto"></textarea>'
            + '</div>'
            + '</form>',
            'accordionform': '<div id="titre">'+titre+'</div>'
            + '<div id="result">'+text+'</div>'
        },
        translations: {
            en: {
                "accordion": "accordéon",
                "accordion-label": "nombre d'onglets",
                "titre-accordeon": "titre accordéon"
            }
        },
        init: function(app)
        {
            // define app
            this.app = app;

            // define services
            this.lang = app.lang;
            this.toolbar = app.toolbar;
            this.insertion = app.insertion;
        },

        // messages
        onmodal: {
            accordion: {
                opened: function($modal, $form)
                {
                    $form.getField('nombre_onglets').focus();
                },
                insert: function($modal, $form)
                { var i=0;
                    var data = $form.getData();
                    console.log("première Data"+data);
                    while (i < (data.nombre_onglets)) {
                        i++;
                        text = text + ('<label>## section' + i + ' ##</label>');
                        text = text + ('<input type="text" name="section' + i+'"></input>');
                        console.log(i);
                        console.log(text);
                    }
                    text = text + '</div>'
                        + '</form>';
                    y=i;
                    titre= data.texto;
                    this.app.api('module.modal.close');
                    this.app.api('module.modal.build',optionsmodal2);
                    console.log("accordion form est :"+ 'accordionform');
                },
            },
            accordionform: {
                opened: function($modal, $form) {
                    $("#titre").html(titre);
                    $("#result").html(text);
                },
                save: function($modal,$form) {
                    var datamodal2= $form.getData();
                    console.log(datamodal2);
                    console.log(datamodal2.section1);
                    console.log(datamodal2.toString());
                    console.log($("section1").html(datamodal2));

                    this._insert(datamodal2);
                    this.app.api('module.modal.close');
                }
            }

        },
        // public
        start: function()
        {
            // create the button data
            var buttonData = {
                title: this.lang.get('accordion'),
                api: 'plugin.accordion.open'
            };

            // create the button
            var $button = this.toolbar.addButton('accordion', buttonData);
        },
        open: function()
        {
            var options = {
                title: this.lang.get('accordion'),
                width: '600px',
                name: 'accordion',
                handle: 'insert',
                commands: {
                    insert: { title: this.lang.get('insert') },
                    cancel: { title: this.lang.get('cancel') }
                }
            };
            this.app.api('module.modal.build', options);
        },

        // private
        _insert: function(data)
        {   var pas;
            for (pas = 0; pas < y; pas++) {
                monaccordion = monaccordion+ ("rien");
                console.log("Faire un pas vers l'est" + monaccordion);
            }

            var monaccordion = ("<p>" +
                "<div class=\"container-fluid page-content\">\n" +
                "<div class=\"row\">\n" +
                "<div class=\"container\">\n" +
                "<div class=\"row\">\n" +
                "<div class=\"col-12 col-lg-10 offset-lg-1\">\n" +
                "<h2>\n" +
                titre +
                "</h2>\n" +
                "</div>\n" +
                "</div>\n" +
                "<div class=\"row\">\n" +
                "<div class=\"col-12 col-lg-10 offset-lg-1\">\n" +
                "<div class=\"accordion ui-accordion ui-widget ui-helper-reset\" role=\"tablist\">\n" +
                "<div class=\"accordion-header ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-active ui-state-active\" role=\"tab\" id=\"ui-id-1\" aria-controls=\"ui-id-2\" aria-selected=\"true\" aria-expanded=\"true\" tabindex=\"0\"><span class=\"ui-accordion-header-icon ui-icon ui-icon-triangle-1-s\"></span>\n" +
                "<div class=\"title\">\n" +
                "Section 1\n" +
                "<div class=\"arrow\">\n" +
                "<figure><img src=\"https://portesouvertes.ideematic.com/assets/front/accordion-arrow-aad7ca66adc28f2f839486c3b6bc86424b3492cd6698f61a777cdc7adc1e9745.svg\" alt=\"Accordion arrow\" data-image=\"gzq2ksoxnfks\"></figure>\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>\n" +
                "<div class=\"accordion-body ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content ui-accordion-content-active\" id=\"ui-id-2\" aria-labelledby=\"ui-id-1\" role=\"tabpanel\" style=\"display: block;\" aria-hidden=\"false\">\n" +
                "<p>\n" +
                $(text).section1 +
                "</p>\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>\n" +
                "</div></p>");
            this.app.api('module.modal.close');
      //      this.app.api('module.modal.build',optionsmodal2);
      //      this.app.api('module.modal.close');
          //  if (data.trim() === '') return;
            this.insertion.insertHtml(monaccordion);

            /*            if (data.nombre_onglets.trim() === '') return;


                        montext = ("<div class=\"col-12 col-lg-10 offset-lg-1\">\n");
                  //      this.insertion.insertText(data.nombre_onglets);
                        this.insertion.insertHtml(montext);
            */
        }
    });
})(Redactor);