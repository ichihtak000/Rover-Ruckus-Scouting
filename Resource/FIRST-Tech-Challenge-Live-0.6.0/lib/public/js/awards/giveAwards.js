/* Copyright (c) 2018 FIRST, Thomas Barnette, George Marchant, and Trey Woodlief. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted (subject to the limitations in the disclaimer below) provided that
 * the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list
 * of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this
 * list of conditions and the following disclaimer in the documentation and/or
 * other materials provided with the distribution.
 *
 * Neither the name of FIRST nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS
 * LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
$( document ).ready(function() {
    updateAwardsList();
    var activeAwardId;
    var teamAward = false;


    $('#give-awards-list-container').on('click', '.award-item', function() {
        $('#give-awards-award-item-' + activeAwardId).find('.active').hide();
        activeAwardId = $(this).attr('id');
        $(this).find('.active').show();
        activeAwardId = activeAwardId.substring(activeAwardId.lastIndexOf('-') + 1);
        loadAward(activeAwardId);
    });

    $('#give-awards-viewer-edit').click(function() {
        $('.edit-off').hide();
        $('.edit-on').show();
        $("input").prop('disabled', false);
        $("select").prop('disabled', false);
        $("textarea").prop('disabled', false);
    });
    $('#give-awards-viewer-cancel').click(function() {
        $('.edit-off').show();
        $('.edit-on').hide();
        $("input").prop('disabled', true);
        $("select").prop('disabled', true);
        $("textarea").prop('disabled', true);
        loadAward(activeAwardId); // reset the award fields
    });
    $('#give-awards-viewer-save').click(function() {
        var awardUrl = "?ID=" + activeAwardId;
        awardUrl += "&winnerDesc=" + $("#give-awards-viewer-justification").val();
        if (teamAward) {
        	var t1 = $("#give-awards-viewer-winner-team-1").find("option:selected").val();
        	if(!t1){
        		t1 = -1;
        	}
        	var t2 = $("#give-awards-viewer-winner-team-2").find("option:selected").val();
        	if(!t2){
        		t2 = -1;
        	}
        	var t3 = $("#give-awards-viewer-winner-team-3").find("option:selected").val();
        	if(!t3){
        		t3 = -1;
        	}
            awardUrl+= "&winnerTeam=" + t1;//.attr("id");
            awardUrl+= "&secondTeam=" + t2;//ttr("id");
            awardUrl+= "&thirdTeam=" + t3;//attr("id");
        } else {
            awardUrl+= "&winnerName=" + $("#give-awards-viewer-winner-individual-1").find("input").val();
            awardUrl+= "&secondName=" + $("#give-awards-viewer-winner-individual-2").find("input").val();
            awardUrl+= "&thirdName=" + $("#give-awards-viewer-winner-individual-3").find("input").val();
        }
        $.ajax({
            url: "../give_award/" + awardUrl,
            type: "PUT",
            success: function(){
                $('.edit-off').show();
                $('.edit-on').hide();
                $("input").prop('disabled', true);
                $("select").prop('disabled', true);
                $("textarea").prop('disabled', true);
                updateAwardsList(); // get updated changes in left hand list
                loadAward(activeAwardId); // update the award fields with server data
            }
        });
    });

    function updateAwardsList() {
        $.ajax({
            url: "../get_awards/",
            success: function(data){
                $('#give-awards-list-container').html("");
                var awards = JSON.parse(data);
                awards.sort(function(a, b) {
                    if (a.order < b.order) return -1;
                    if (a.order > b.order) return 1;
                    return 0;
                });
                for (i = 0; i < awards.length; i++) {
                    var awardItem = $('#give-awards-award-item').clone();
                    awardItem[0].id += "-" + awards[i].ID;
                    awardItem.find('.award-name').html(awards[i].name);
                    if (awards[i].required) {
                        awardItem.addClass('required');
                    }
                    if (awards[i].winnerName !== undefined && awards[i].winnerName !== "") {
                        awardItem.find('.award-winner').html("1st Place " + awards[i].winnerName);
                        awardItem.addClass('given');
                    } else {
                        awardItem.find('.award-winner').html("1st Place NOT GIVEN");
                    }
                    $('#give-awards-list-container').append(awardItem);
                }
                if (activeAwardId === undefined) {
                    activeAwardId = awards[0].ID;
                    loadAward(activeAwardId); //set active award if none present
                }
            }
        });
    };

    function loadAward(id) {
        $.ajax({
            url: "../get_awards/?id=" + id,
            success: function(data){
                var award = JSON.parse(data);
                $('#give-awards-viewer-name').html(award.name);
                $('#give-awards-viewer-desc').html(award.description);
                $('#give-awards-viewer-justification').val(award.winnerDescription);
                $('#give-awards-viewer-winners-container').html("");
                teamAward = award.teamAward;
                var winner = teamAward ? (award.winnerTeam === undefined ? undefined : award.winnerTeam.data.number) : award.winnerName;
                var second = teamAward ? (award.secondTeam === undefined ? undefined : award.secondTeam.data.number) : award.secondName;
                var third = teamAward ? (award.thirdTeam === undefined ? undefined : award.thirdTeam.data.number) : award.thirdName;
                createAwardInput(winner, teamAward ? "team" : "individual", 1, "Winner");
                createAwardInput(second, teamAward ? "team" : "individual", 2, "Second Place");
                createAwardInput(third, teamAward ? "team" : "individual", 3, "Third Place");

                // disable form
                $('.edit-off').show();
                $('.edit-on').hide();
                $("input").prop('disabled', true);
                $("select").prop('disabled', true);
                $("textarea").prop('disabled', true);

                // set status
                $('#give-awards-viewer-status span').html(award.required ? "Must be given" : "Optional");
                if (award.winnerName !== undefined && award.winnerName !== "") {
                    $('#give-awards-viewer-status span').html("Already given");
                }
            }
        });
    }

    // isTeam true for teams false for individuals
    // number 1 2 or 3 depending on award, (1 is 1st place)
    // labelString the string value for the label next to the input
    function createAwardInput(winner, inputId, number, labelString) {
        inputId = "give-awards-viewer-winner-" + inputId;
        var awardInput = $("#" + inputId).clone(true, true);
        awardInput[0].id += "-" + number;
        awardInput.find('.form-control').attr("id", inputId + '-input-' + number);
        awardInput.find('label').attr("for", inputId + '-input-' + number);
        awardInput.find('.form-control').val((winner !== undefined && winner !== "") ? winner : "(none)");
        awardInput.find('label').html(labelString);
        $('#give-awards-viewer-winners-container').append(awardInput);
    }
});