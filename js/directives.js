invApp.directive('transactionForm',function(){
    return {
        restrict : "E",
        templateUrl : "js/templates/transaction-form.html",
        replace : true,
        scope : {
            year : "@",
            itemKey : "@",
            addInv : "&",
            addDisp : "&",
            printDiv : "&",
            itemName : "@",
            maxDisposal : "@"
        }
    };
});

invApp.directive('transactionDetails',function(){
    return {
        restrict : "E",
        templateUrl : "js/templates/transaction-details.html",
        replace : true,
        scope : {
            transaction : "="
        }
    };
});
