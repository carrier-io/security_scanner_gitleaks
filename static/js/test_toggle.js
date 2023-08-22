const GitleaksIntegration = {
    delimiters: ['[[', ']]'],
    props: ['instance_name', 'section', 'selected_integration', 'is_selected', 'integration_data'],
    emits: ['set_data', 'clear_data'],
    data() {
        return this.initialState()
    },
    computed: {
        body_data() {
            const {
                config,
                is_default,
                selected_integration: id,

                save_intermediates_to,

                squash_commits,
                show_offender_line,
                redact_offenders,
                hide_commit_author,
                use_custom_rules,

                custom_rules_path,
                additional_text,
                commit_line_limit,
            } = this
            return {
                config,
                is_default,
                id,

                save_intermediates_to,

                squash_commits,
                show_offender_line,
                redact_offenders,
                hide_commit_author,
                use_custom_rules,

                custom_rules_path,
                additional_text,
                commit_line_limit,
            }
        },
    },
    watch: {
        selected_integration(newState, oldState) {
            console.debug('watching selected_integration: ', oldState, '->', newState, this.integration_data)
            this.set_data(this.integration_data?.settings, false)
        }
    },
    methods: {
        get_data() {
            if (this.is_selected) {
                return this.body_data
            }
        },
        set_data(data, emit = true) {
            Object.assign(this.$data, data)
            emit&& this.$emit('set_data', data)
        },
        clear_data() {
            Object.assign(this.$data, this.initialState())
            this.$emit('clear_data')
        },

        handleError(response) {
            try {
                response.json().then(
                    errorData => {
                        errorData.forEach(item => {
                            console.debug('gitleaks item error', item)
                            this.error = {[item.loc[0]]: item.msg}
                        })
                    }
                )
            } catch (e) {
                alertCreateTest.add(e, 'danger-overlay')
            }
        },

        initialState: () => ({
            // toggle: false,
            config: {},
            error: {},
            save_intermediates_to: '/data/intermediates/sast',

            squash_commits:false,
            show_offender_line: false,
            redact_offenders: false,
            hide_commit_author: false,
            use_custom_rules: false,

            custom_rules_path: "",
            additional_text: "",
            commit_line_limit: 15,
        })
    },
    template: `
        <div class="mt-3">
            <div class="row">
                <div class="col">
                    <h7>Advanced Settings</h7>
                    <p>
                        <h13>Integration default settings can be overridden here</h13>
                    </p>
                </div>
            </div>
            <div class="form-group">
                <form autocomplete="off">
                    <div class="form-group">
                        <h9>Scan Options</h9>
                        <div class="row p-2 pl-4">
                            <div class="col">
                                <label class="custom-checkbox align-items-center mr-3">
                                    <input type="checkbox" name="squash_commits" v-model="squash_commits">
                                    <h9 class="ml-1">
                                        Show Commits
                                    </h9>
                                </label>
                            </div>
                            <div class="col">
                                <label class="custom-checkbox align-items-center mr-3">
                                    <input type="checkbox" v-model="show_offender_line" name="show_offender_line">
                                    <h9 class="ml-1">
                                        Show Offender Line
                                    </h9>
                                </label>
                            </div>
                        </div>

                        <div class="row p-2 pl-4">
                            <div class="col">
                                <label class="custom-checkbox align-items-center mr-3">
                                    <input type="checkbox" v-model="redact_offenders" name="redact_offenders">
                                    <h9 class="ml-1">
                                        Redact Offenders
                                    </h9>
                                </label>
                            </div>
                            <div class="col">
                                <label class="custom-checkbox align-items-center mr-3">
                                    <input type="checkbox" v-model="hide_commit_author" name="hide_commit_author">
                                    <h9 class="ml-1">
                                        Hide Commit Author
                                    </h9>
                                </label>
                            </div>
                        </div>


                        <div class="row p-2 pl-4">
                            <div class="col">
                                <label class="custom-checkbox align-items-center mr-3">
                                    <input type="checkbox" v-model="use_custom_rules" name="use_custom_rules">
                                    <h9 class="ml-1">
                                        Use Custom Rules
                                    </h9>
                                </label>
                            </div>
                        </div>

                    </div>

                    <h9>Save intermediates to</h9>
                    <p>
                        <h13>Optional</h13>
                    </p>
                    <input type="text" class="form-control form-control-alternative"
                        placeholder=""
                        v-model="save_intermediates_to"
                        :class="{ 'is-invalid': error.save_intermediates_to }">
                    <div class="invalid-feedback">[[ error.save_intermediates_to ]]</div>

                    <h9>Additional text</h9>
                    <p>
                        <h13>Optional</h13>
                    </p>
                    <input type="text" class="form-control form-control-alternative"
                        placeholder="additional options"
                        v-model="additional_text"
                        :class="{ 'is-invalid': error.scan_opts }">
                    <div class="invalid-feedback">[[ error.scan_opts ]]</div>

                    <h9>Path to custom rules</h9>
                    <p>
                        <h13>Optional</h13>
                    </p>
                    <input type="text" class="form-control form-control-alternative"
                        placeholder=""
                        v-model="custom_rules_path"
                        :class="{ 'is-invalid': error.scan_path }">
                    <div class="invalid-feedback">[[ error.scan_path ]]</div>
                </form>
            </div>
        </div>
    `
}


register_component('scanner-gitleaks', GitleaksIntegration)
