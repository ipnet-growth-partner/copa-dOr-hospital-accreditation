import * as $ from 'jquery';

export default class RegistrationStepOneForm {
    // PERSONAL INFORMATION (pi) && REGISTRATION STEP PERSONAL INFORMATION (RSPI)
    private piMale:      HTMLInputElement = <HTMLInputElement> document.getElementById('RSPISM');
    private piFemale:    HTMLInputElement = <HTMLInputElement> document.getElementById('RSPISF');

    // COMMERCIAL INFORMATION (ci) && REGISTRATION STEP PERSONAL INFORMATION (RSPI)
    private ciContainer: HTMLElement      = document.getElementById('card-registration-step-form-commercial-information');
    private ciMale:      HTMLInputElement = <HTMLInputElement> document.getElementById('RSCICM');
    private ciFemale:    HTMLInputElement = <HTMLInputElement> document.getElementById('RSCICF');

    // APPLICATION CATEGORY (ac) && REGISTRATION STEP PERSONAL INFORMATION (RSPI)
    private acContainer:        HTMLElement       = document.getElementById('card-registration-step-form-application-category');
    private acApplicationType:  HTMLSelectElement = <HTMLSelectElement> document.getElementById('RSPIST');
    private acRoutineDoctor:    HTMLImageElement  = <HTMLImageElement>  document.getElementById('RSCICMTHR');
    private acPlantonistDoctor: HTMLImageElement  = <HTMLImageElement>  document.getElementById('RSCICMTHP');
    private acSubstituteDoctor: HTMLImageElement  = <HTMLImageElement>  document.getElementById('RSCICMTHS');

    private changeCIStatus(_dataStatus: string, _disabled: boolean): void {
        this.ciContainer.querySelectorAll('div').forEach(_HTMLElementDivs => {
            if(_HTMLElementDivs.hasAttribute('data-status')) {
                _HTMLElementDivs.setAttribute('data-status', _dataStatus);
                _HTMLElementDivs.childNodes.forEach(_HTMLElements => {
                    if(_HTMLElements.nodeName == 'INPUT') {
                        (<HTMLInputElement> _HTMLElements).disabled = _disabled;
                    }
                });
            }
        });
    }

    private changeACStatus(_disabled: boolean, _dataFor: string): void {
        this.acContainer.querySelectorAll('div').forEach(_HTMLElementDivs => {
            if(_HTMLElementDivs.hasAttribute('data-for') && _HTMLElementDivs.getAttribute('data-for') === _dataFor) {
                const HTMLInputElements  = _HTMLElementDivs.querySelectorAll('input');
                const HTMLSelectElements = _HTMLElementDivs.querySelectorAll('select');
            
                HTMLInputElements.forEach(_HTMLElementInputs  => {
                    (_disabled) ? _HTMLElementInputs.disabled = true : _HTMLElementInputs.removeAttribute('disabled');
                });

                HTMLSelectElements.forEach(_HTMLElementSelects => {
                    if(_HTMLElementSelects.hasAttribute('data-type') && _HTMLElementSelects.getAttribute('data-type') === 'bootstrap-select') {
                        $(`#${_HTMLElementSelects.id}`).prop('disabled', _disabled);
                        $(`#${_HTMLElementSelects.id}`).selectpicker('refresh');
                        $(`#${_HTMLElementSelects.id}`).selectpicker('render');
                    } else {
                        _HTMLElementSelects.disabled = _disabled;
                    }
                  });

                  _HTMLElementDivs.setAttribute('data-status', 'actived');
            } else if(_HTMLElementDivs.hasAttribute('data-for') && _HTMLElementDivs.getAttribute('data-for') !== _dataFor) {
                _HTMLElementDivs.setAttribute('data-status', 'desactived');
            }
        });
    }
    
    private changeACImages(): void {
        this.piMale.addEventListener('click', () => {
            this.acRoutineDoctor.src    = './dist/img/doctor_male_routine.png';
            this.acPlantonistDoctor.src = './dist/img/doctor_male_plantonist.png';
            this.acSubstituteDoctor.src = './dist/img/doctor_male_substitute.png';
            this.acApplicationType.disabled = false;
        });

        this.piFemale.addEventListener('click', () => {
            this.acRoutineDoctor.src    = './dist/img/doctor_female_routine.png';
            this.acPlantonistDoctor.src = './dist/img/doctor_female_plantonist.png';
            this.acSubstituteDoctor.src = './dist/img/doctor_female_substitute.png';
            this.acApplicationType.disabled = false;
        });
    }
    
    private enableCommercialOptions(): void {
        this.ciMale.addEventListener('click', () => this.changeCIStatus('actived', false));
    }

    private disableCommercialOptions(): void {
        this.ciFemale.addEventListener('click', () => this.changeCIStatus('desactived', true));
    }

    private enableApplicationOptions():void {
        this.acApplicationType.addEventListener('change', () => {
            const optionSelected = this.acApplicationType.options[this.acApplicationType.selectedIndex].value;

            switch(optionSelected) {
                case 'Membro Contratado':
                    this.changeACStatus(false, 'Contracted Member');
                    break;
                case 'Membro de Equipe Assistente':
                        this.changeACStatus(false, 'Assistant Member');
                    break;
                case 'Membro Regular':
                    this.changeACStatus(false, 'Regular Member');
                    break;
                case 'Membro Temporário':
                    this.changeACStatus(false, 'Temporary Member');
                    break;
                case 'Membro Referência':
                    this.changeACStatus(false, 'Reference Member');
                    break;
                case 'Membro Eventual':
                    this.changeACStatus(false, 'Eventual Member');
                    break;
            }
        });

    }

    public init(): void {
        this.enableApplicationOptions();
        this.enableCommercialOptions();
        this.disableCommercialOptions();

        this.changeACImages();
    }
}