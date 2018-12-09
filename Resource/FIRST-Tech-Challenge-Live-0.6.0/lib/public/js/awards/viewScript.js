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
    // get awards list
    $.ajax({
        url: "../get_awards/",
        success: function(data){
            $('#view-script-list-container').html("");
            var awards = JSON.parse(data);
            awards.sort(function(a, b) {
                if (a.order < b.order) return -1;
                if (a.order > b.order) return 1;
                return 0;
            });
            for (i = 0; i < awards.length; i++) {
                var awardItem = $("#view-script-templates .award-item").clone();
                awardItem.find('.award-name').html(awards[i].name);
                awardItem.find('.award-desc').html(awards[i].description);

                if (awards[i].winnerName && awards[i].winnerName !== "") {
                    var awardWinnerItem = $("#view-script-templates .award-winner-item").clone();
                    awardWinnerItem.find('.award-place').html("1st Place");
                    awardWinnerItem.find('.award-winner').html(awards[i].winnerName);
                    if(awards[i].winnerDescription.length > 0){
	                    awardWinnerItem.find('.award-winner-comments-intro').prop("hidden", false);
	                    awardWinnerItem.find('.award-winner-comments').text(awards[i].winnerDescription);
	                }
                    awardItem.find('.award-winners').prepend(awardWinnerItem);
                  //  awardItem.find('.award-winner-desc').html(awards[i].winnerDescription);
                }
                if (awards[i].secondName && awards[i].secondName !== "") {
                    var awardWinnerItem = $("#view-script-templates .award-winner-item").clone();
                    awardWinnerItem.find('.award-place').html("2nd Place");
                    awardWinnerItem.find('.award-winner').html(awards[i].secondName);
                    awardItem.find('.award-winners').prepend(awardWinnerItem);
                }
                if (awards[i].thirdName && awards[i].thirdName !== "") {
                    var awardWinnerItem = $("#view-script-templates .award-winner-item").clone();
                    awardWinnerItem.find('.award-place').html("3rd Place");
                    awardWinnerItem.find('.award-winner').html(awards[i].thirdName);
                    awardItem.find('.award-winners').prepend(awardWinnerItem);
                }

                $('#view-script-list-container').append(awardItem);
            }
        }
    });
});

function printScript() {
    window.print();
}