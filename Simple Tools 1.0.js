/*
Simple Tools
© 2019 Dark Tornado, All rights reserved.
version 1.0
리뷰는 허용하나, 2차 공유 및 판매 등의 행위는 금지
*/

const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const version = "1.0";
const entityData = [
    ["닭", 10],
    ["소", 11],
    ["돼지", 12],
    ["양", 13],
    ["늑대", 14],
    ["주민 (구버전)", 15],
    ["버섯소", 16],
    ["오징어", 17],
    ["토끼", 18],
    ["박쥐", 19],
    ["아이언 골램", 20],
    ["스노우 골램", 21],
    ["오셸롯", 22],
    ["말", 23],
    ["당나귀", 24],
    ["노새", 25],
    ["스켈레톤 말", 26],
    ["좀비 말", 27],
    ["북극곰", 28],
    ["라마", 29],
    ["앵무새", 30],
    ["돌고래", 31],
    ["좀비", 32],
    ["크리퍼", 33],
    ["스켈레톤", 34],
    ["거미", 35],
    ["좀비 피그맨", 36],
    ["슬라임", 37],
    ["엔더맨", 38],
    ["좀벌레", 39],
    ["동굴 거미", 40],
    ["가스트", 41],
    ["마그마 큐브", 42],
    ["블레이즈", 43],
    ["좀비 주민 (구버전)", 44],
    ["마녀", 45],
    ["스트레이", 46],
    ["허스크", 47],
    ["위더 스켈레톤", 48],
    ["가디언", 49],
    ["엘더 가디언", 50],
    ["NPC", 51],
    ["위더", 52],
    ["엔더 드래곤", 53],
    ["셜커", 54],
    ["엔더 마이트", 55],
    ["에이전트/Learn to Code Mascot(1.0.0.X)", 56],
    ["우민 번명자", 57],
    ["팬텀", 58],
    ["파괴수", 59],
    ["갑옷 거치대", 61],
    ["카메라", 62],
    ["드롭된 아이템", 64],
    ["활성화된 TNT", 65],
    ["떨어지는 블록", 66],
    ["경험치 포션", 68],
    ["경험치", 69],
    ["엔더의 눈", 70],
    ["엔더 크리스탈", 71],
    ["폭죽", 72],
    ["삼지창", 73],
    ["바다거북", 74],
    ["고양이", 75],
    ["셜커 총알", 76],
    ["낚싯대", 77],
    ["용 화염구", 79],
    ["화살", 80],
    ["눈덩이", 81],
    ["달걀", 82],
    ["그림", 83],
    ["마인카트", 84],
    ["화염구", 85],
    ["투척 포션", 86],
    ["엔더 진주", 87],
    ["끈 매듭", 88],
    ["위더 머리", 89],
    ["보트", 90],
    ["번개", 93],
    ["작은 화염구", 94],
    ["잔류형 물약 입자/카메라(0.14.x)", 95],
    ["깔때기 마인 카트", 96],
    ["TNT 마인 카트", 97],
    ["창고 마인 카트", 98],
    ["커맨드 블록", 100],
    ["라마의 침", 102],
    ["소환사 덫", 103],
    ["우민 소환사", 104],
    ["벡스", 105],
    ["복어", 108],
    ["연어", 109],
    ["드라운드", 110],
    ["열대어", 111],
    ["대구", 112],
    ["판다", 113],
    ["약탈자", 114],
    ["주민", 115],
    ["좀비  주민", 116],
    ["떠돌이 상인", 118]
];

var btn = null;
var menu = null;
var version2 = "알 수 없음";

var dayLock = false;
var weatherClear = false;
var weatherClearTick = 0;
var useJump = false;
var btnMoved = false;

const Tools = {
    save: function(name, value) {
        try {
            var file = new java.io.File(sdcard + "/darkTornado/SimpleTools/" + name + ".txt");
            var fos = new java.io.FileOutputStream(file);
            var str = new java.lang.String(value);
            fos.write(str.getBytes());
            fos.close();
        } catch (e) {
            toast(e);
        }
    },
    read: function(name) {
        try {
            var file = new java.io.File(sdcard + "/darkTornado/SimpleTools/" + name + ".txt");
            if (!file.exists()) return "";
            var fis = new java.io.FileInputStream(file);
            var isr = new java.io.InputStreamReader(fis);
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while ((line = br.readLine()) != null) {
                str += "\n" + line;
            }
            fis.close();
            isr.close();
            br.close();
            return str;
        } catch (e) {
            toast(e);
        }
    },
    makeButton: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    if (btn != null) btn.dismiss();
                    btn = new android.widget.PopupWindow();
                    var button = new android.widget.Button(ctx);
                    button.setText("S.T.");
                    button.setTextColor(android.graphics.Color.WHITE);
                    button.setBackgroundColor(android.graphics.Color.argb(255, 46, 125, 50));
                    button.setPadding(0, 0, 0, 0);
                    button.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(v) {
                            if (menu == null) {
                                simpleTools();
                            } else {
                                menu.dismiss();
                                menu = null;
                            }
                        }
                    }));
                    var longTouchCheck = false;
                    button.setOnLongClickListener(new android.view.View.OnLongClickListener({
                        onLongClick: function(v) {
                            longTouchCheck = true;
                            return true;
                        }
                    }));
                    button.setOnTouchListener(new android.view.View.OnTouchListener({
                        onTouch: function(v, ev) {
                            try {
                                if (longTouchCheck) {
                                    switch (ev.action) {
                                        case android.view.MotionEvent.ACTION_MOVE:
                                            if (btnMoved) btn.update(ev.getRawX(), ev.getRawY(), btn.getWidth(), btn.getHeight());
                                            else btn.update(ev.getRawX(), ctx.getWindowManager().getDefaultDisplay().getHeight() - ev.getRawY(), btn.getWidth(), btn.getHeight());
                                            break;
                                        case android.view.MotionEvent.ACTION_UP:
                                            Tools.save("btnX", ev.getRawX());
                                            Tools.save("btnY", ev.getRawY());
                                            longTouchCheck = false;
                                            break;
                                    }
                                }
                            } catch (e) {
                                //print(e);
                            }
                            return false;
                        }
                    }));
                    btn.setContentView(button);
                    btn.setWidth(dip2px(ctx, 45));
                    btn.setHeight(dip2px(ctx, 38));
                    btn.setAnimationStyle(android.R.style.Animation_InputMethod);
                    btn.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                    if (Tools.read("btnX") == "") btn.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.BOTTOM, 0, 0);
                    else btn.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, Tools.read("btnX"), Tools.read("btnY"));
                } catch (e) {
                    toast(e);
                }
            }
        }));
    },
    getLine: function() {
        var txt = new android.widget.TextView(ctx);
        txt.setLayoutParams(android.widget.LinearLayout.LayoutParams(-1, -2));
        txt.setHeight(dip2px(ctx, 1));
        txt.setBackgroundColor(android.graphics.Color.LTGRAY);
        return txt;
    },
    getDataFromServer: function(url) {
        try {
            var url = new java.net.URL(url);
            var con = url.openConnection();
            if (con != null) {
                con.setConnectTimeout(5000);
                con.setUseCaches(false);
                var isr = new java.io.InputStreamReader(con.getInputStream());
                var br = new java.io.BufferedReader(isr);
                var str = br.readLine();
                var line = "";
                while ((line = br.readLine()) != null) {
                    str += "\n" + line;
                }
                isr.close();
                br.close();
                con.disconnect();
            }
            return str.toString();
        } catch (e) {
            return null;
            toast(e);
        }
    },
    checkVersion: function() {
        var data0 = Tools.getDataFromServer("https://raw.githubusercontent.com/DarkTornado/SimpleTools/master/VersionInfo.txt");
        if (data0 == null) return;
        var data = (data0 + "").split("\n");
        version2 = data.shift();
        var url = data.shift();
        if (Number(version2) > Number(version)) {
            newVersionAlert(url);
        }
        if (data.indexOf(version) == -1) {
            Tools.save("block", "true");
            Tools.showAlert();
        } else {
            Tools.save("block", "false");
        }
    },
    showAlert: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new android.app.AlertDialog.Builder(ctx);
                    dialog.setTitle("Simple Tools 경고");
                    dialog.setMessage("이 버전의 Simple Tools(버전 " + version + ")는 무단 공유 등의 이유로 제작자가 작동을 차단해서 작동하지 않습니다. 제작자의 블로그에서 최신 버전을 받아 주세요.");
                    dialog.setNegativeButton("닫기", null);
                    dialog.setPositiveButton("제작자 블로그", new android.content.DialogInterface.OnClickListener({
                        onClick: function(v) {
                            Tools.openUrl("https://blog.naver.com/dt3141592");
                        }
                    }));
                    dialog.show();
                } catch (e) {
                    toast(e);
                }
            }
        }));
    },
    openUrl: function(url) {
        var uri = new android.net.Uri.parse(url);
        var link = new android.content.Intent(android.content.Intent.ACTION_VIEW, uri);
        ctx.startActivity(link);
    }


};

new java.io.File(sdcard + "/darkTornado/SimpleTools/").mkdirs();
Tools.makeButton();
Tools.checkVersion();
if (Tools.read("btnX") != "") btnMoved = true;

function dip2px(ctx, dips) {
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function toast(msg) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            var toast = new android.widget.Toast.makeText(ctx, "[S.T.] " + msg, android.widget.Toast.LENGTH_LONG);
            toast.show();
        }
    }));
}

function showDialog(title, msg) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new android.app.AlertDialog.Builder(ctx);
                dialog.setTitle(title);
                dialog.setMessage(msg);
                dialog.setNegativeButton("닫기", null);
                dialog.show();
            } catch (e) {
                toast(e);
            }
        }
    }));
}

function simpleTools() {
    if (Tools.read("block") == "true") {
        Tools.showAlert();
        return;
    }
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                menu = new android.widget.PopupWindow();
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                var margin = new android.view.ViewGroup.MarginLayoutParams(-1, -2);
                var pad = dip2px(ctx, 10);
                var title = new android.widget.TextView(ctx);
                title.setText("Simple Tools");
                title.setTextSize(23);
                title.setTextColor(android.graphics.Color.WHITE);
                title.setBackgroundColor(android.graphics.Color.argb(255, 46, 125, 50));
                title.setPadding(dip2px(ctx, 15), pad, pad, pad);
                margin.setMargins(0, 0, 0, dip2px(ctx, 7));
                title.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
                try {
                    title.setElevation(dip2px(ctx, 5));
                } catch (e) {
                    //null
                }

                var sws = [];
                var bools = [dayLock, weatherClear, useJump];
                var menuS = ["낮으로 고정", "맑은 날씨 유지", "2단 점프 사용"];
                for (var n in menuS) {
                    if (n > 0) layout.addView(Tools.getLine());
                    sws[n] = new android.widget.Switch(ctx);
                    sws[n].setText(menuS[n]);
                    sws[n].setTextSize(18);
                    sws[n].setTextColor(android.graphics.Color.BLACK);
                    sws[n].setId(n);
                    sws[n].setChecked(bools[n]);
                    sws[n].setPadding(pad, pad, pad, pad);
                    sws[n].setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(swit, onoff) {
                            switch (swit.getId()) {
                                case 0:
                                    dayLock = onoff;
                                    break;
                                case 1:
                                    weatherClear = onoff;
                                    break;
                                case 2:
                                    useJump = onoff;
                                    if (onoff) toast("공중부양이 2단점프로 대체됩니다.");
                                    break;
                            }
                        }
                    }));
                    layout.addView(sws[n]);
                }
                var btns = [];
                var menus = ["아이템 검색", "게임 속도 조절", "스크립트 정보", "제작자 블로그", "닫기"];
                for (var n in menus) {
                    layout.addView(Tools.getLine());
                    btns[n] = new android.widget.TextView(ctx);
                    btns[n].setText(menus[n]);
                    btns[n].setTextSize(18);
                    btns[n].setTextColor(android.graphics.Color.BLACK);
                    btns[n].setId(n);
                    btns[n].setPadding(pad, pad, pad, pad);
                    btns[n].setOnClickListener(new android.view.View.OnClickListener() {
                        onClick: function(v) {
                            switch (v.getId()) {
                                case 0:
                                    new java.lang.Thread({
                                        run: function() {
                                            makeItemList();
                                        }
                                    }).start();
                                    toast("아이템 목록 생성중...");
                                    break;
                                case 1:
                                    gameSpeed();
                                    break;
                                case 2:
                                    showDialog("스크립트 정보", "이름 : Simple Tools\n버전 : " + version + "\n최신 버전 : " + version2 + "\n제작자 : Dark Tornado\n\n 뻘기능들을 모아놓은 스크립트입니다. 리뷰는 허용하나, 2차 공유 및 판매 등의 행위는 금지되어 있습니다.");
                                    break;
                                case 3:
                                    Tools.openUrl("https://blog.naver.com/dt3141592");
                                    break;
                                case 4:
                                    menu.dismiss();
                                    menu = null;
                                    break;
                            }
                        }
                    });
                    layout.addView(btns[n]);
                }

                var maker = new android.widget.TextView(ctx);
                maker.setText("\n© 2019 Dark Tornado\n");
                maker.setTextSize(13);
                maker.setTextColor(android.graphics.Color.BLACK);
                maker.setGravity(android.view.Gravity.CENTER);
                layout.addView(maker);
                pad = dip2px(ctx, 5);
                layout.setPadding(pad, pad, pad, pad);

                var scroll = new android.widget.ScrollView(ctx);
                scroll.addView(layout);
                var layout2 = new android.widget.LinearLayout(ctx);
                layout2.setOrientation(1);
                layout2.addView(title);
                layout2.addView(scroll);
                menu.setContentView(layout2);
                menu.setAnimationStyle(android.R.style.Animation_Translucent);
                menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(255, 238, 238, 238)));
                menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() / 3);
                menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
                menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT, 0, 0);
            } catch (e) {
                toast(e);
            }
        }
    }));
}

function makeItemList() {
    try {
        var items = [];
        var codes = [0, 9, 11, 64, 95, 97, 140, 144, 246, 248, 249, 255, 373, 383, 439];
        var names = ["공기", "멈춘 물", "멈춘 용암", "문(블록)", "보이지 않는 베드락", "몬스터 스폰알(?)", "화분", "머리", "빛나는 옵시디언", "업데이트 블록 1", "업데이트 블록 2", "오류 돌", "물병(포션)", "스폰알", "카메라"];
        var codes2 = [1, 5, 6, 17, 18, 24, 35, 38, 43, 44, 79, 97, 98, 155, 159, 161, 162, 171, 175, 333, 349, 350, 351, 373, 438, 262];
        var lengths = [7, 6, 6, 4, 4, 3, 16, 9, 8, 8, 2, 6, 3, 3, 16, 2, 2, 16, 6, 6, 4, 4, 16, 36, 36, 37];
        for (var n = 0; n < 4096; n++) {
            if (Item.isValidItem(n)) {
                if (codes.indexOf(n) == -1) {
                    items.push("[ " + n + " : 0 ] " + Item.getName(n, 0));
                    if (n == 325) {
                        items.push("[ " + n + " : 8 ] " + Item.getName(n, 8));
                        items.push("[ " + n + " : 10 ] " + Item.getName(n, 10));
                    }
                } else if (n == 383) {
                    var entityIds = [];
                    for (var m = 0; m < entityData.length; m++) {
                        if (entityData[m][1] < 64 || entityData[m][1] > 100) entityIds.push(entityData[m][1]);
                    }
                    var codes3 = [20, 21, 44, 52];
                    var names3 = ["아이언 골램 생성", "스노우 골램 생성", "좀비 주민 생성", "위더 생성"];
                    for (var m = 0; m < entityIds.length; m++) {
                        if (codes3.indexOf(m) != -1) items.push("[ 383 : " + codes3[codes3.indexOf(m)] + " ] " + names3[codes3.indexOf(m)]);
                        else items.push("[ 383 : " + entityIds[m] + " ] " + Item.getName(383, entityIds[m]));
                    }
                } else {
                    items.push("[ " + n + " : 0 ] " + names[codes.indexOf(n)]);
                }
                if (codes2.indexOf(n) != -1) {
                    for (var m = 1; m < lengths[codes2.indexOf(n)]; m++) {
                        items.push("[ " + n + " : " + m + " ] " + Item.getName(n, m));
                    }
                }
            }
        }
        itemSearch(items);
    } catch (e) {
        toast(e);
    }
}

function itemSearch(items) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new android.app.AlertDialog.Builder(ctx);
                dialog.setTitle("아이템 목록/검색");
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                var txt = new android.widget.EditText(ctx);
                txt.setHint("검색어를 입력하세요...");
                layout.addView(txt);
                var list = new android.widget.ListView(ctx);
                var adapter = new android.widget.ArrayAdapter(ctx, android.R.layout.simple_list_item_1, items);
                list.setAdapter(adapter);
                list.setTextFilterEnabled(true);
                list.setFastScrollEnabled(true);
                list.setOnItemClickListener(new android.widget.AdapterView.OnItemClickListener() {
                    onItemClick: function(parent, view, postion, id) {
                        var id, damage;
                        var cache = String(view.getText());
                        var cache2 = cache.substring(2, cache.indexOf(" ]"));
                        var data = cache2.split(" : ");
                        inputAmount(data[0], data[1]);
                    }
                });
                layout.addView(list);
                txt.addTextChangedListener(new android.text.TextWatcher({
                    onTextChanged: function(s, start, before, count) {
                        try {
                            adapter.getFilter().filter(s.toString());
                        } catch (e) {
                            toast(e);
                        }
                    },
                    afterTextChanged: function(s) {
                        try {
                            if (txt.getText().length == 0)
                                adapter.getFilter().filter(null);
                        } catch (e) {
                            toast(e);
                        }
                    }
                }));
                var pad = dip2px(ctx, 10);
                layout.setPadding(pad, pad, pad, pad);
                dialog.setView(layout);
                dialog.setNegativeButton("닫기", null);
                dialog.show();
            } catch (e) {
                toast(e);
            }
        }
    }));
}

function inputAmount(itemId, itemDamage) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new android.app.AlertDialog.Builder(ctx);
                dialog.setTitle("아이템 지급 (" + Item.getName(itemId, itemDamage) + ")");
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                var txt = new android.widget.EditText(ctx);
                txt.setHint("개수를 입력하세요...");
                txt.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
                layout.addView(txt);
                var pad = dip2px(ctx, 10);
                layout.setPadding(pad, pad, pad, pad);
                dialog.setView(layout);
                dialog.setNegativeButton("취소", null);
                dialog.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
                    onClick: function(v) {
                        addItemInventory(itemId, txt.getText(), itemDamage);
                        toast("지급되었습니다.");
                    }
                }));
                dialog.show();
            } catch (e) {
                toast(e);
            }
        }
    }));
}

function gameSpeed() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new android.app.AlertDialog.Builder(ctx);
                dialog.setTitle("게임 속도 조절");
                var modes = ["× 0.5", "× 1", "× 2", "× 3", "× 5", "× 10"];
                var speeds = [10, 20, 40, 60, 100, 200];
                dialog.setItems(modes, new android.content.DialogInterface.OnClickListener({
                    onClick: function(m, w) {
                        ModPE.setGameSpeed(speeds[w]);
                        toast("게임 속도가 " + modes[w] + "(으)로 설정되었습니다.");
                    }
                }));
                dialog.setNegativeButton("취소", null);
                dialog.show();
            } catch (e) {
                toast(e);
            }
        }
    }));
}

function newVersionAlert(url) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new android.app.AlertDialog.Builder(ctx);
                dialog.setTitle("최신 버전 발견");
                dialog.setMessage("최신 버전이 발견되었습니다.\n현재 버전 : " + version + "\n최신 버전 : " + version2);
                dialog.setNegativeButton("닫기", null);
                dialog.setPositiveButton("다운로드", new android.content.DialogInterface.OnClickListener({
                    onClick: function(v) {
                        Tools.openUrl(url);
                        toast("다운로드 링크로 이동합니다.");
                    }
                }));
                dialog.show();
            } catch (e) {
                toast(e);
            }
        }
    }));
}

function modTick() {
    if (dayLock) {
        Level.setTime(1400);
    }
    if (weatherClear) {
        if (weatherClearTick == 0 && (Level.getRainLevel() > 0 || Level.getLightningLevel() > 0)) {
            Level.executeCommand("/weather clear", true);
            toast("날씨가 흐려진 것이 감지되어, 날씨를 맑게 설정합니다.");
            weatherClearTick = 100;
        }
    }
    if (weatherClearTick > 0) {
        weatherClearTick--;
    }
    if (useJump && Player.isFlying()) {
        Player.setFlying(false);
        yaw = Math.floor(getYaw());
        sin = -Math.sin(yaw / 180 * Math.PI);
        cos = Math.cos(yaw / 180 * Math.PI);
        pe = Player.getEntity();
        Entity.setVelX(pe, 1.7 * sin);
        Entity.setVelY(pe, 0.5);
        Entity.setVelZ(pe, 1.7 * cos);
    }

}

function leaveGame() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            if (menu != null) {
                menu.dismiss();
                menu = null;
            }
        }
    }));
}

