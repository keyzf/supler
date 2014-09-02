class SuplerForm {
    private renderOptions: RenderOptions;
    private validatorFnFactories: any;
    private validationErrors: ValidationErrors;
    private validatorRenderOptions: ValidatorRenderOptions;

    constructor(private container: HTMLElement, customOptions: any) {
        this.renderOptions = new DefaultRenderOptions();
        Util.copyProperties(this.renderOptions, customOptions);

        this.validatorFnFactories = new DefaultValidatorFnFactories;
        Util.copyProperties(this.validatorFnFactories, customOptions);

        this.validatorRenderOptions = new ValidatorRenderOptions;
        Util.copyProperties(this.validatorRenderOptions, customOptions);
    }

    create(formJson) {
        var result = new CreateFormFromJson(this.renderOptions, this.validatorFnFactories).formFromJson(formJson);
        this.container.innerHTML = result.html;
        this.validationErrors = new ValidationErrors(this.container, result.validatorDictionary,
            this.validatorRenderOptions);
    }

    getValue() {
        return new ReadFormValues().getValueFrom(this.container);
    }

    /**
     * @returns True if there were validation errors.
     */
    processServerValidationErrors(validationJson): boolean {
        return this.validationErrors.processServer(validationJson);
    }

    /**
     * @returns True if there were validation errors.
     */
    validate(): boolean {
        return this.validationErrors.processClient();
    }
}
