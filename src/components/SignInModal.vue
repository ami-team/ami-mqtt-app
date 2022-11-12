<!-- *************************************************************************************************************** -->

<template>
    <Teleport to="body">

        <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="C2BE0D9F_9779_84D1_EA11_023EBF2CA62F">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">

                        <h5 class="modal-title">
                            <i class="bi bi-plugin"></i> Connection
                        </h5>

                    </div>
                    <div class="modal-body">

                        <p>Please fill out the infrastucture information to continue.</p>

                        <form id="DA646FB8_5E07_5DE0_1BE4_74A7893F8858">

                            <div class="mb-3">
                                <label class="form-label" for="mqttTokenInput">Token<sup class="text-danger">*</sup></label>
                                <input class="form-control" type="text" placeholder="Token..." id="mqttTokenInput" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="false" required />
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="mqttBrokerEndpointInput">Broker URL<sup class="text-danger">*</sup></label>
                                <input class="form-control" type="text" placeholder="Endpoint..." id="mqttBrokerEndpointInput" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="false" required />
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="amiPipelineEndpointInput">AMI-Pipeline URL<sup class="text-muted">opt</sup></label>
                                <input class="form-control" type="text" placeholder="Endpoint..." id="amiPipelineEndpointInput" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="false" optional />
                            </div>

                        </form>

                    </div>
                    <div class="modal-footer">

                        <button class="btn btn-primary" type="submit" form="DA646FB8_5E07_5DE0_1BE4_74A7893F8858">
                            <i class="bi bi-check-lg"></i> Connect
                        </button>

                    </div>
                </div>
            </div>
        </div>

    </Teleport>
</template>

<!-- *************************************************************************************************************** -->
