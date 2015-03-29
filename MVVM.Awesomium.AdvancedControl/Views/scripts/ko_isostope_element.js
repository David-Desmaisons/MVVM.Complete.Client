ko.bindingHandlers.isotopecss = {
    preprocess: function (value, name, addBindingCallback) {
        addBindingCallback('css', value);
        return value;
    },

    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = ko.unwrap(valueAccessor());

        if (!element._isotope)
        {
            var res = null, currentelement = element;
            while (!res) {
                var next =currentelement.parentNode;
                if (next === null)
                    return;
                res = Isotope.data(next);
                currentelement = next;
            }
 
            element._isotope = res;
        }

        setInterval(function () {
            element._isotope.arrange();
        }, 1);
    }
}