/*
 Isotope binding for Knockout 3+
 (c) Michael Best
 Adapted by  David Desmaisons to make it compatible with isotope 2.0
 License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

"use strict";

ko.bindingHandlers.isotope = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This function is run as a computed observable and gets the binding value, saving the data
        // value as an observableArray. If an observableArray is given and there are no other
        // dependencies, just use that observable. Otherwise, update our own observableArray with
        // the latest value.
        function setDataObservableAndOptions() {
            var value = valueAccessor();
            if (value && value.data && !('length' in value)) {
                if (value.isotopeOptions) {
                    if (typeof (value.isotopeOptions) == 'function')
                        ko.utils.extend(isotopeOptions, value.isotopeOptions());
                    else
                        ko.utils.extend(isotopeOptions, value.isotopeOptions);
                }
                value = value.data;
            }

            // If there are any dependencies, those dependencies might later change the observableArray object
            // itself. So play it safe and only use the given observableArray if there are no dependencies.
            if (!dataComputed.getDependenciesCount() && ko.isObservable(value) && 'push' in value) {
                dataObservable = value;
            } else {
                dataObservable(ko.unwrap(value));
            }
        }

        // Create a copy of the template element, add it to the container, and bind it to the data item.
        function createAndAddItemElement(item) {
            var itemElement = $template.clone()[0];
            element.appendChild(itemElement);

            var itemContext = bindingContext.createChildContext(item);
            ko.applyBindings(itemContext, itemElement);

            return itemElement;
        }

        function createAndAddItemElements(items) {

            var fragment = document.createDocumentFragment();
            var elementnodes = [];
            for (var i = 0; i < items.length; i++) {
                var elementnode = $template.clone()[0];
                fragment.appendChild(elementnode);
                var itemContext = bindingContext.createChildContext(items[i]);
                ko.applyBindings(itemContext, elementnode);
                elementnodes.push(elementnode);
            }

            var newnodes = element.appendChild(fragment);

            return elementnodes;
        }

        // Called after all elements are added to itemElements, this will update their index values
        // so that they're ordered properly by Isotope.
        function updateIndexes() {
            var i, itemElement;
            for (i = 0; itemElement = itemElements[i]; ++i) {
                itemElement._ko_isotope_index = i;
            }
        }

        // Whenver the observableArray changes, respond by updating the container and Isotope
        function respondToArrayChanges(changeList) {
            var i, change, itemElement,
                elemsToRemove = [], elemsToMove = [], elemsToAdd = [];

            // Deletions
            for (i = changeList.length - 1; change = changeList[i]; --i) {
                if (change.status === 'deleted') {
                    itemElement = itemElements.splice(change.index, 1)[0];
                    if (change.moved == undefined) {
                        elemsToRemove.push(itemElement);
                    } else {
                        elemsToMove[change.index] = itemElement;
                    }
                }
            }

            // Additions
            for (i = 0; change = changeList[i]; ++i) {
                if (change.status === 'added') {
                    if (change.moved == undefined) {
                        elemsToAdd.push(itemElement = createAndAddItemElement(change.value));
                    } else {
                        itemElement = elemsToMove[change.moved];
                    }
                    itemElements.splice(change.index, 0, itemElement);
                }
            }


            // Update Isotope
            if (elemsToRemove.length) {
                //$container.isotope('remove', $(elemsToRemove));
                iso.remove(elemsToRemove);
                iso.arrange();
            }
            if (elemsToAdd.length || elemsToMove.length) {
                // When items are added or reorderd, Isotope needs to know the new indexes.
                updateIndexes();
                //$container.isotope('reloadItems');

                if (elemsToAdd.length)
                    //$container.isotope('insert', $(elemsToAdd));
                    iso.appended(elemsToAdd);
                if (elemsToMove.length) {
                    //$container.isotope();       // When items are just reordered, this tells Isotope to sort and refresh.
                    iso.updateSortData(elemsToMove);
                    iso.arrange();
                }
            }
        }
        var $container = $(element), $children = $container.children();

        if ($children.length !== 1) {
            throw Error("Isotope binding requires a single element as a template");
        }

        var isotopeOptions = {
            itemSelector: '*',
            filter: '*',
            sortBy: 'index',
            getSortData: { index: function (elem) { return elem._ko_isotope_index; } }
        },
            $template = $($children[0]),
            dataObservable = ko.observableArray(),
            dataComputed = ko.computed(setDataObservableAndOptions, null, { deferEvaluation: true, disposeWhenNodeIsRemoved: element }),
            itemElements,
            iso,
            subscription;



        // Access computed observable to initialize it
        dataComputed();

        // Initialize with data from the array.
        $container.empty();
        //itemElements = ko.utils.arrayMap(dataObservable(), createAndAddItemElement);
        itemElements = createAndAddItemElements(dataObservable());
        updateIndexes();
        iso = new Isotope(element, isotopeOptions);

        // Set up a subscription to respond to changes in the array.
        subscription = dataObservable.subscribe(respondToArrayChanges, null, 'arrayChange');
        ko.utils.domNodeDisposal.addDisposeCallback(element, subscription.dispose.bind(subscription));

        return { controlsDescendantBindings: true };
    }
};