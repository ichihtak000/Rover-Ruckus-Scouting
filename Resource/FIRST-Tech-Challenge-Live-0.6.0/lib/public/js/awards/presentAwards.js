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
$(document).ready(function () {
    var active;
    var activeNum = -1;
    updateAwardsList();

    $('#present-awards-present').click(function() {
        if (showAward($(".award-card").first())) activeNum = 0;
    });

    $('#present-awards-prev').click(function() {
        if (showAward($("#present-awards-list-container .award-card")[activeNum - 1])) activeNum--;
    });

    $('#present-awards-next').click(function() {
        if (showAward($("#present-awards-list-container .award-card")[activeNum + 1])) activeNum++;
    });

    $('#present-awards-list-container').on("click", ".award-card", function() {
        if (showAward(this)) activeNum = $(".award-card").index(this);
    });

    function updateAwardsList() {
        $.ajax({
            url: "../get_awards/",
            success: function(data){
                $('#present-awards-list-container').html("");
                var awards = JSON.parse(data);
                awards.sort(function(a, b) {
                    if (a.order < b.order) return -1;
                    if (a.order > b.order) return 1;
                    return 0;
                });
                for (i = 0; i < awards.length; i++) {
                    var awardId = "#present-awards-award-item";
                    var awardItem = $(awardId).clone();
                    awardId += "-" + awards[i].ID;
                    awardItem[0].id += "-" + awards[i].ID;
                    awardItem.find('.award-card').data("place", "award");
                    awardItem.find('.award-order-number').html(awards[i].order);
                    awardItem.find('.award-name').html(awards[i].name);
                    $('#present-awards-list-container').append(awardItem);

                    if (awards[i].thirdName && awards[i].thirdName !== "") {
                        var awardWinner = $("#present-awards-templates .award-winner-item").clone();
                        awardWinner.data("place", "third");
                        awardWinner.find('.award-place').html("3rd Place");
                        awardWinner.find('.award-winner').html(awards[i].thirdName);
                        $(awardId + " .award-winners").append(awardWinner);
                    }
                    if (awards[i].secondName && awards[i].secondName !== "") {
                        var awardWinner = $("#present-awards-templates .award-winner-item").clone();
                        awardWinner.data("place", "second");
                        awardWinner.find('.award-place').html("2nd Place");
                        awardWinner.find('.award-winner').html(awards[i].secondName);
                        $(awardId + " .award-winners").append(awardWinner);
                    }
                    if (awards[i].winnerName && awards[i].winnerName !== "") {
                        var awardWinner = $("#present-awards-templates .award-winner-item").clone();
                        awardWinner.data("place", "winner");
                        awardWinner.find('.award-place').html("1st Place");
                        awardWinner.find('.award-winner').html(awards[i].winnerName);
                        $(awardId + " .award-winners").append(awardWinner);
                    }
                }
            }
        });
    };

    function showAward(awardItem) {
        if (!awardItem) return false;
        var awardId = $(awardItem).closest('.award-item').attr("id");
        var awardUrl = "?ID=" + awardId.substring(awardId.lastIndexOf('-') + 1) + "&show=" + $(awardItem).data("place");
        $.ajax({
            url: "../show_award/" + awardUrl,
            type: "POST",
            success: function(){
                $(active).removeClass("active");
                active = awardItem;
                $(awardItem).addClass("active");
            }
        });
        return true;
    }
});