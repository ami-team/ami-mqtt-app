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
                                <label class="form-label" for="C003DCF9_6336_8943_221F_9F1FD7451CF6">Token<sup class="text-danger">*</sup></label>
                                <input class="form-control" type="text" placeholder="Token..." id="C003DCF9_6336_8943_221F_9F1FD7451CF6" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="false" required />
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="D7CF85AE_D095_B7E6_1018_3BD727935E4D">MQTT Broker URL<sup class="text-danger">*</sup></label>
                                <input class="form-control" type="text" placeholder="Endpoint..." id="D7CF85AE_D095_B7E6_1018_3BD727935E4D" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="false" required />
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="F1742259_7FDE_DC08_127F_E4F9B809F4C6">AMI-Pipeline URL<sup class="text-muted">opt</sup></label>
                                <input class="form-control" type="text" placeholder="Endpoint..." id="F1742259_7FDE_DC08_127F_E4F9B809F4C6" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="false" optional />
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
