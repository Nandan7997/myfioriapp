sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat"
], function (Controller, JSONModel, DateFormat) {
    "use strict";

    return Controller.extend("myfioriapp.controller.FormView", {
        onInit: function () {
            // Initialize JSON Model with form data structure
            let oData = {
                formData: { 
                    name: "",
                    email: "",
                    password: "",
                    gender: "",
                    hobbies: {
                        reading: false,
                        traveling: false,
                        cooking: false
                    },
                    country: "USA",
                    bio: "",
                    birthdate: ""
                },
                xmlOutput: ""
            };
            let oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        onSubmit: function () {
            // Retrieve form data from the model
            let oModel = this.getView().getModel();
            let formData = oModel.getProperty("/formData");

            // Convert form data to XML
            let xmlOutput = this.generateXML(formData);
            oModel.setProperty("/xmlOutput", xmlOutput);
        },

        generateXML: function (formData) {
            // Create XML document and root element
            let xmlDoc = document.implementation.createDocument("", "formData", null);
            let root = xmlDoc.documentElement;

            // Helper function to add XML elements
            function createElement(name, value) {
                let element = xmlDoc.createElement(name);
                element.textContent = value;
                return element;
            }

            // Add elements to XML based on form data
            root.appendChild(createElement("name", formData.name));
            root.appendChild(createElement("email", formData.email));
            root.appendChild(createElement("password", formData.password));
            root.appendChild(createElement("gender", formData.gender));

            let hobbies = xmlDoc.createElement("hobbies");
            hobbies.appendChild(createElement("reading", formData.hobbies.reading));
            hobbies.appendChild(createElement("traveling", formData.hobbies.traveling));
            hobbies.appendChild(createElement("cooking", formData.hobbies.cooking));
            root.appendChild(hobbies);

            root.appendChild(createElement("country", formData.country));
            root.appendChild(createElement("bio", formData.bio));
            root.appendChild(createElement("birthdate", formData.birthdate));

            // Serialize XML to string
            let serializer = new XMLSerializer();
            return serializer.serializeToString(xmlDoc);
        }
    });
});
