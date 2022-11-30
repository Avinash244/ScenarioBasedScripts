import { api, LightningElement } from 'lwc';
import Id from '@salesforce/user/Id';
import { CloseActionScreenEvent } from 'lightning/actions';
import updateAssembly from '@salesforce/apex/WOD_BMAssemblyController.updateAssembly'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class WOD_BMAssignToMe extends LightningElement {
    @api recordId;
    @api userId = Id;
    closeAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
    @api invoke() {
        console.log('invoke recordId::' + this.recordId);
        console.log('invoke userId::' + this.userId);
         updateAssembly({ assemblyId: this.recordId , userId : this.userId })
            .then(result => {
                console.log('result::' + JSON.stringify(result));
                const event = new ShowToastEvent({
                    title: 'Toast message',
                    message: 'User Assigned Successfully!!!!',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(event);
               // eval("$A.get('e.force:refreshView').fire();");
						 location.reload();
            })
            .catch(error => {
                console.log('error::' + JSON.stringify(error))
						   const evt = new ShowToastEvent({
        title: 'Toast Error',
        message: 'Some unexpected error'+error.body.message,
        variant: 'error',
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);
            });
    }
}
