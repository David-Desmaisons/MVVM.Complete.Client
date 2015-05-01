ko.bindingHandlers.isotopecss = {
    preprocess: function (value, name, addBindingCallback) {
        addBindingCallback('css', value);
        return value;
    },

    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = ko.unwrap(valueAccessor()), res = ko.utils.domData.get(element, "_isotope");

        if (!res){
            var currentelement = element;
            while (!res) {
                var next =currentelement.parentNode;
                if (next === null)
                    return;
                res = Isotope.data(next);
                currentelement = next;
            }

            ko.utils.domData.set(element, "_isotope",res);
        }

        var $element = $(element), zindex = $element.css("z-index");

        function updateTransition() {
            if (!!zindex){
                $element.css("z-index", zindex);
            }
            $element.off("webkitTransitionEnd", updateTransition);
        }

        $element.css("z-index",999);
        $element.on("webkitTransitionEnd", updateTransition);

        res.arrange();
    }
}