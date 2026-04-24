<script lang="ts">
    const { text, elo, rank } = $props<{
        text: string;
        rank: string;
    }>();

    function getOffsetByRank(rank: string): Array<number> {
        if (rank.includes("Coal")) {
            if (rank == "Coal 1") {
                return [0, 0];
            } else if (rank == "Coal 2") {
                return [-1.40625, 0];
            }
            return [-2.8125, 0];
        } else if (rank.includes("Iron")) {
            if (rank == "Iron 1") {
                return [-4.21875, 0];
            }
            if (rank == "Iron 2") {
                return [-5.625, 0];
            }
            return [-7.03125, 0];
        } else if (rank.includes("Gold")) {
            if (rank == "Gold 1") {
                return [0, -1.40625];
            } else if (rank == "Gold 2") {
                return [-1.40625, -1.40625];
            }
            return [-2.8125, -1.40625];
        } else if (rank.includes("Emerald")) {
            if (rank == "Emerald 1") {
                return [-4.21875, -1.40625];
            }
            if (rank == "Emerald 2") {
                return [-5.625, -1.40625];
            }
            return [-7.03125, -1.40625];
        } else if (rank.includes("Diamond")) {
            if (rank == "Diamond 1") {
                return [0, -2.8125];
            } else if (rank == "Diamond 2") {
                return [-1.40625, -2.8125];
            }
            return [-2.8125, -2.8125];
        } else if (rank == "Netherite") {
            return [-4.21875, -2.8125];
        }
        return [-5.625, -2.8125];
    }

    let offset = getOffsetByRank(rank);
</script>

<div class="flex flex-row items-center justify-center">
    <span>{text}:</span>
    <div
        class="bg-no-repeat"
        style="
                  background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAAtCAMAAAAZUYxJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACxUExURZuwsqjEtiQuNYCPmS0/Pll3bmdyf4CZkhsZK9zq5cfYyhMhHUdMWf///zhBSQ8EFPrqLs332rJkEffEMQ1mPpDbr+KRBG3bg//3nf/6rVnWVQg/PHYzDPTGPR+oOwp/VErt2U8ocgpbYCDFtahkvDQaUQAAANX/9hiblxgNKy0bSRYWFqH76Nt/0IhOoz09PSzg2AoADx0JOg5HPlU3d0YpdSYmJhuJkfeq4jUlTwAAAOYMmYwAAAA7dFJOU/////////////////////////////////////////////////////////////////////////////8AocQ7HgAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIDUuMS4xMYoIFs4AAAO7SURBVFhHpZQNU+JIEIYlhOCtxoV8EJf1MBA+BRR3Fffy/3/YvdPTM+lOpTiq7q3Cmcein2qaDjf1NbnuXZwen64o4JOjsR/0+WYT8snROAgH9nKVOgoivlHCgZJpHAKHdGN1ECmZRpiVOxxKVw/oZoA06NQ30tUHihG0MBz0RJ/oEmj7RARadRD1o1u6mfQJvayF4eCvb73BHRMmS8jzlcjqfnTfqCNCPwKN4fBbjOqhdQ89UqMKSR3cR/fBg3PfMPKsWhj2UDt0bfc80nwV2oLbh8aMNgmbrhWGgyFqh6Hr2iF3LZDVwUMgZk3YzFojqr2ZhkvYzNojf8zvwXd7ofSBYiVaeIf1cmY0Skg9mwh06lupbmEElHt95/fDpAeUe+2R1bUytzFSZrQt1S1E2/wZrlL35TwQZW6j33Gnvpzr3sVx07muaMTnVRnz6dQJnxyNaZLyzSbjk6Mxz3J7YXWSKpnGCXDCd5OskLICWPAdadCpR9KVAkWfCrOsznK82H4BrTp5/CHcI0I/X43ZNIvzIpv+/E8ktalNJ0/miqSMttGJR55JFo+LacGqwiMNQSHUSZL+iB9HafJEco2pwL/Bmakdz1BNco25wBzqZJQ+jlA7SScJZBoxCIEj01RejMf583Q6g0zjWOGYuh6lqE0mrmuJ6Nqj7Xo2Hef588x1LRFdezRdI4npybRMwaYR+lkzulnPnk2tBQyX0c26QbshT9hcZ8ZKEDYbohDf/gy1zn0Brbp+8vthkgLlXkvMftam0s7jIjq1aBrROAHKp9H3SCmA9vGjNMjqWpnbmMrPgEgzojHHN0hx6sv5X798l1PyyZnzeTlOveCTo7FaVHyr6+W8nq/wWjIjaz5bYfViI2Vb4JbviEQyL3cvwr3ed7utehEf4sZdEfohSLTm46twr/dv3W5So7Y8+b5LRh6CQms+Ll/ff/HE1/s4jjvdRm262mwO29/0n61HGkIL56vXI9wfn3CbwPx2fut0Q72Iy83hUFblF7k1Yhoe0ffL7sOYl5+rHbnX+/PbeX+Ozx3um3px2Jwq1G6rk5FpLBWWL7vV5+vxz/HP6oPc1ryO6S8bfUzXqN5ut6dTZbtWWAmkruFeHlcf/4iuu8121gf0VH5ZM4brkGetkNzezO5OM6nrxdeprOykkYqRt0/hvH5537HZbUj3pFld/64aM9aN0D+AErHXv9531nzVXsMtzBgC0D1+iETrFmbj7jQ7dS3NiEb6Bjnklma4+WzFqS+n9ctnv8HLqet/AeFM0AfYldt3AAAAAElFTkSuQmCC&quot;);
                  width: 1.40625rem;
                  height: 1.40625rem;
                  background-position: {offset[0]}rem {offset[1]}rem;
                  background-size: 8.4375rem 4.21875rem;
                  image-rendering: pixelated;
                "
    ></div>
    <span class="ml-1.25">{rank}</span>
</div>
