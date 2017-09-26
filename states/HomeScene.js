var HomeScene = function() {};

HomeScene.prototype = {
  clickCount: 0,
  endingBGDelay: 1500,
  switchStateDelay: 2600,
  startTxt: [
    'Joseph是我的導盲犬，我們是合作無間的夥伴；',
    '儘管眼前是一片黑暗，有Joseph在身邊，步伐終於不再緩慢。'
  ],
  icon:{
    speed: 200,
    delay: 200,
    txtDistance:230, 
    txtStyle: {font: "52px SansCJK", fill: 'white', align:'center'},
    work:{
      txt:null,
      word:"[ 通勤上班 ]",
      button:null,
      x:464,
      y:559,
      choose:{
        sprite:null,
        x:464,
        y:559
      },
      dialog:{
        sprite:null,
        x:464,
        y:872
      }
    },
    hometown:{
      txt:null,
      word:"[ 回老家 ]",
      button:null,
      x: 960,
      y: 559,
      choose:{
        sprite:null,
        x: 960,
        y: 559,
      },
      dialog:{
        sprite:null,
        x:0,
        y:0
      }
    },
    leisure:{
      txt:null,
      word:"[ 休閒娛樂 ]",
      button:null,
      x:1456,
      y:559,
      choose:{
        sprite:null,
        x:1456,
        y:559,
      },
      dialog:{
        sprite:null,
        x:0,
        y:0
      }
    }
  },
  dialog:{
    txt:
    [
      ['「時間差不多了，該準備出門囉，Joseph～」','- 選擇出門的裝備 -'],
      ['「東西差不多都準備好了，那……」','- 選擇今天的行程 -']
    ],
    y: 150, 
    alpha: 0.7,
    speed:1000,
    tweenDistance:50,
    delay: 400,
    txtY: 160,
    txtDistance: 35,
    txtSpeed:1000,
    txtDelay:100,
    txt2Delay : 100,
    txt2DelaySpace : 200
  },
  joseph:{
    left:{x:239 , y:606},
    right:{x:1614 , y:742},
    distance:30,
    delay: 200,
    speed: 1000
  },
  boxDistance: 190, 
  txt:{
    doc:     '這個還是帶著預防萬一好了，雖然\n近來已經比較少拿出來了～',
    hat:     '大家都說這頂帽子超好看的！戴帽\n子除了遮陽，還有其他功能喔！',
    saddle:  '哈哈，看到我拿導盲鞍還是這麼興\n奮啊，好了好了不要再鑽了，很快\n就戴好了啦', 
    cape:    '身為我的英雄，當然是要穿披風才\n稱頭啊',
    stick:   '雖然有了Joseph，這個還是要帶\n著才能預防更多危險呢',
    raincoat:'Raincoat', 
    umbrella:'Umbrella'
  },
  annoTxt:{
    doc:     '公文袋',
    hat:     '帽子',
    saddle:  '導盲鞍', 
    cape:    '披風',
    stick:   '手杖',
    raincoat:'雨衣', 
    umbrella:'雨傘'
  },
  startTxtDistance: 30,
  tween:{
    startTxtSpeed: 500,
    startTxtDelay: 2500,
    txtDelay: 2000,
    speed: 500,
    boxDistance: 20, 
    boxSpeed: 200, 
    methodExp: Phaser.Easing.Exponential.Out,
    methodLinear: Phaser.Easing.Linear.None,
    methodCubicOut: Phaser.Easing.Cubic.Out
  },
  pathTxt:{
    distance: 230, 
    style: {font: "52px SansCJK", fill: 'white', align:'center'},
    1:'[  ]',
    2:'[  ]',
    3:'[  ]'
  },


  init: function () {
    // load settings from Json
    this.loadJson();

    // start scene
    this.brownBG = game.make.sprite(0, 0, 'loadingBG');
    this.endingBrownBG = game.make.sprite(0, 0, 'loadingBG');
    this.startTxt1 = game.make.text(game.world.centerX, game.world.centerY - this.startTxtDistance, this.startTxt[0], {font: "38px SansCJK", fill: 'white'});
    this.startTxt2 = game.make.text(game.world.centerX, game.world.centerY + this.startTxtDistance, this.startTxt[1], {font: "38px SansCJK", fill: 'white'});

    // alpha no need to be 0
    this.homeBG = game.make.sprite(0, 0, 'home_home');

    // alpha 0
    this.homeJosephLeft = game.make.sprite(this.joseph.left.x - this.joseph.distance,  this.joseph.left.y, 'home_Joseph');
    this.homeJosephRight = game.make.sprite(this.joseph.right.x - this.joseph.distance, this.joseph.right.y, 'home_Joseph2');
    this.topDialog = game.make.sprite(game.world.centerX, this.dialog.y - this.dialog.tweenDistance, 'home_a_dialog_box');
    this.dialogTxt1 = [
      game.make.text(game.world.centerX, this.dialog.txtY - this.dialog.txtDistance - this.dialog.tweenDistance, this.dialog.txt[0][0], {font: "38px SansCJK", fill: 'black'}),
      game.make.text(game.world.centerX, this.dialog.txtY + this.dialog.txtDistance - this.dialog.tweenDistance, this.dialog.txt[0][1], {font: "34px SansCJK", fill: 'black'})
    ];
    this.dialogTxt2 = [
      game.make.text(game.world.centerX, this.dialog.txtY - this.dialog.txtDistance - this.dialog.tweenDistance, this.dialog.txt[1][0], {font: "38px SansCJK", fill: 'black'}),
      game.make.text(game.world.centerX, this.dialog.txtY + this.dialog.txtDistance - this.dialog.tweenDistance, this.dialog.txt[1][1], {font: "34px SansCJK", fill: 'black'})
    ];

    // buttons
    this.makeItemButtons();

    // Dialog boxes and texts
    this.makeBoxTxts();

    this.blackCover = game.make.sprite(0,0,'home_back');

    // make choice icon buttons
    this.makeIconButtons();

    // set anchor and alpha
    utils.centerGameObjects([this.topDialog, this.startTxt1, this.startTxt2, this.homeJosephLeft, this.homeJosephRight, this.docTxt, this.docBox, this.saddleTxt, this.saddleBox,
      this.stickTxt, this.stickBox, this.hatTxt, this.hatBox, this.raincoatTxt, this.raincoatBox, this.umbrellaTxt, this.umbrellaBox,
      this.docAnno, this.hatAnno, this.stickAnno, this.saddleAnno, this.umbrellaAnno, this.raincoatAnno, 
      this.dialogTxt1[0], this.dialogTxt1[1], this.dialogTxt2[0], this.dialogTxt2[1], 
      this.icon.work.button, this.icon.work.txt, this.icon.work.choose.sprite, this.icon.work.dialog.sprite,
      this.icon.leisure.button,  this.icon.leisure.txt, this.icon.leisure.choose.sprite,
      this.icon.hometown.button, this.icon.hometown.txt,  this.icon.hometown.choose.sprite]);

    utils.zeroAlpha([this.startTxt1, this.startTxt2, this.homeBG, this.homeJosephLeft, this.homeJosephRight, this.documentButton, 
      this.saddleButton, this.stickButton, this.hatButton, this.raincoatButton, this.umbrellaButton, this.endingBrownBG,
      this.docAnno, this.hatAnno, this.stickAnno, this.saddleAnno, this.umbrellaAnno, this.raincoatAnno, 
      this.topDialog, this.dialogTxt1[0], this.dialogTxt1[1], this.dialogTxt2[0], this.dialogTxt2[1], this.blackCover,
      this.icon.work.button, this.icon.work.txt, this.icon.work.choose.sprite, this.icon.work.dialog.sprite,
      this.icon.leisure.button, this.icon.leisure.txt, this.icon.leisure.choose.sprite,
      this.icon.hometown.button, this.icon.hometown.txt, this.icon.hometown.choose.sprite]);

    // make tweens
    this.makeStartTween();
    this.makeEndTween();
    this.makeIconTween();
  },

  preload: function () {
    // start Scene
    utils.addExistingMultiple([this.brownBG, this.startTxt1, this.startTxt2]);

    utils.addExistingMultiple([this.homeBG, this.homeJosephLeft, this.homeJosephRight]);

    // add item buttons
    utils.addExistingMultiple([this.documentButton, this.hatButton, this.stickButton, this.saddleButton, this.raincoatButton, 
      this.umbrellaButton]);

    utils.addExistingMultiple([this.blackCover, this.topDialog, this.dialogTxt1[0], this.dialogTxt1[1], this.dialogTxt2[0], this.dialogTxt2[1]]);
    utils.addExistingMultiple([this.icon.work.button, this.icon.work.txt, this.icon.work.choose.sprite, this.icon.work.dialog.sprite,
      this.icon.leisure.button, this.icon.leisure.txt, this.icon.leisure.choose.sprite,
     this.icon.hometown.button, this.icon.hometown.txt,  this.icon.hometown.choose.sprite]);

    // disable all buttons
    this.disableAllButtons();

    // add box groups
    this.addTxtBoxGroups();

    // make tweenings for box groups
    this.makeBoxGroupsTween();

    utils.addExistingMultiple([this.endingBrownBG]);

    // zero alpha the box groups
    utils.zeroAlpha([this.docGroup, this.saddleGroup, this.hatGroup, this.stickGroup, this.raincoatGroup, this.umbrellaGroup]);

  },

  create: function () {
    // if (musicPlayer.name !== "dangerous" && gameOptions.playMusic) {
    //   musicPlayer.stop();
    //   musicPlayer = game.add.audio('dangerous');
    //   musicPlayer.loop = true;
    //   musicPlayer.play();
    // }
  },

  addClickCount:function(){
    // add clickCount and check if all clicked
    this.clickCount++;

    if (this.clickCount > 5) {
      // start ending tweeen
      this.startEndingTween();
    }
  },

  startEndingTween:function(){
    this.dialogTxtOut1[0].start();
    this.dialogTxtOut1[1].start();
    this.dialogTxtIn2[0].start();
    this.dialogTxtIn2[1].start();

    this.leftJosephOut.start();
    this.rightJosephIn.start();
    this.blackCoverIn.start();

    // 3 choice icons
    // this.enableIconButtons();
    this.iconWorkIn.start();
    this.iconLeisureIn.start();
    this.iconHometownIn.start();
    this.iconWorkTxtIn.start();
    this.iconLeisureTxtIn.start();
    this.iconHometownTxtIn.start();
    game.time.events.add(Phaser.Timer.SECOND * 1, this.enableIconButtons, this);
  },

  startRestTween:function(){
    this.homeBGIn.start();
    this.documentIn.start();
    this.stickIn.start();
    this.saddleIn.start();
    this.hatIn.start();
    this.umbrellaIn.start();
    this.raincoatIn.start();

    // enable buttons
    this.enableItemButtons();

    this.leftJosephIn.start();
    this.topDialogIn.start();
    this.dialogTxtIn1[0].start();
    this.dialogTxtIn1[1].start();
  },

  makeStartTween:function(){
    // tween starting txts
    this.startTxt1In = game.add.tween(this.startTxt1).to({ alpha: 1}, this.tween.startTxtSpeed, this.tween.methodLinear, true);
    this.startTxt2In = game.add.tween(this.startTxt2).to({ alpha: 1}, this.tween.startTxtSpeed, this.tween.methodLinear, true, this.tween.startTxtDelay);
    this.startTxt1Out = game.add.tween(this.startTxt1).to({ alpha: 0}, this.tween.startTxtSpeed, this.tween.methodLinear, false, this.tween.txtDelay + this.tween.startTxtDelay);
    this.startTxt2Out = game.add.tween(this.startTxt2).to({ alpha: 0}, this.tween.startTxtSpeed, this.tween.methodLinear, false, this.tween.txtDelay);
    utils.chainTween(this.startTxt1In, this.startTxt1Out);
    utils.chainTween(this.startTxt2In, this.startTxt2Out);
    this.startTxt2Out.onComplete.add(this.startRestTween, this);

    // tween in BG, stuffs
    this.homeBGIn = game.add.tween(this.homeBG).to({ alpha: 1}, this.tween.speed, this.tween.methodLinear, false); 

    // item tweenings
    this.documentIn = game.add.tween(this.documentButton).to({ alpha: 1}, this.tween.speed, this.tween.methodLinear, false); 
    this.documentOut = game.add.tween(this.documentButton).to({ alpha: 0}, this.tween.speed, this.tween.methodLinear, false); 
    this.saddleIn = game.add.tween(this.saddleButton).to({ alpha: 1}, this.tween.speed, this.tween.methodLinear, false); 
    this.saddleOut = game.add.tween(this.saddleButton).to({ alpha: 0}, this.tween.speed, this.tween.methodLinear, false); 
    this.stickIn = game.add.tween(this.stickButton).to({ alpha: 1}, this.tween.speed, this.tween.methodLinear, false); 
    this.stickOut = game.add.tween(this.stickButton).to({ alpha: 0}, this.tween.speed, this.tween.methodLinear, false); 
    this.hatIn = game.add.tween(this.hatButton).to({ alpha: 1}, this.tween.speed, this.tween.methodLinear, false); 
    this.hatOut = game.add.tween(this.hatButton).to({ alpha: 0}, this.tween.speed, this.tween.methodLinear, false); 
    this.raincoatIn = game.add.tween(this.raincoatButton).to({ alpha: 1}, this.tween.speed, this.tween.methodLinear, false); 
    this.raincoatOut = game.add.tween(this.raincoatButton).to({ alpha: 0}, this.tween.speed, this.tween.methodLinear, false); 
    this.umbrellaIn = game.add.tween(this.umbrellaButton).to({ alpha: 1}, this.tween.speed, this.tween.methodLinear, false); 
    this.umbrellaOut = game.add.tween(this.umbrellaButton).to({ alpha: 0}, this.tween.speed, this.tween.methodLinear, false); 

    // joseph needs movement
    this.leftJosephIn = game.add.tween(this.homeJosephLeft).to({alpha: 1, x:this.joseph.left.x}, this.joseph.speed, this.tween.methodExp, false, this.joseph.delay); 
    utils.chainTween(this.homeBGIn, this.leftJosephIn);

    // top dialog box and txt
    this.topDialogIn = game.add.tween(this.topDialog).to({alpha:this.dialog.alpha, y:this.dialog.y}, this.dialog.speed, this.tween.methodCubicOut, false, this.dialog.delay); 
    this.dialogTxtIn1 = [
      game.add.tween(this.dialogTxt1[0]).to({alpha:1, y:this.dialog.txtY - this.dialog.txtDistance}, this.dialog.txtSpeed, this.tween.methodCubicOut, false, this.dialog.delay + this.dialog.txtDelay),
      game.add.tween(this.dialogTxt1[1]).to({alpha:1, y:this.dialog.txtY + this.dialog.txtDistance}, this.dialog.txtSpeed, this.tween.methodCubicOut, false, this.dialog.delay + 2*this.dialog.txtDelay) 
    ];
  },

  makeEndTween:function(){
    this.leftJosephOut = game.add.tween(this.homeJosephLeft).to({ alpha: 0}, this.joseph.speed, this.tween.methodLinear, false); 
    this.rightJosephIn = game.add.tween(this.homeJosephRight).to({ alpha: 1,x:this.joseph.right.x}, this.joseph.speed, this.tween.methodExp, false, 4 * this.joseph.delay); 
    this.dialogTxtOut1 = [
      game.add.tween(this.dialogTxt1[0]).to({alpha:0}, this.dialog.txtSpeed, this.tween.methodCubicOut, false),
      game.add.tween(this.dialogTxt1[1]).to({alpha:0}, this.dialog.txtSpeed, this.tween.methodCubicOut, false) 
    ];
    this.dialogTxtIn2 = [
      game.add.tween(this.dialogTxt2[0]).to({alpha:1, y:this.dialog.txtY - this.dialog.txtDistance}, this.dialog.txtSpeed, this.tween.methodCubicOut, false, this.joseph.speed + this.dialog.txt2Delay),
      game.add.tween(this.dialogTxt2[1]).to({alpha:1, y:this.dialog.txtY + this.dialog.txtDistance}, this.dialog.txtSpeed, this.tween.methodCubicOut, false, this.joseph.speed + this.dialog.txt2Delay + this.dialog.txt2DelaySpace) 
    ];
    this.dialogTxtOut2 = [
      game.add.tween(this.dialogTxt2[0]).to({alpha:0}, this.dialog.txtSpeed, this.tween.methodCubicOut, false),
      game.add.tween(this.dialogTxt2[1]).to({alpha:0}, this.dialog.txtSpeed, this.tween.methodCubicOut, false) 
    ];
    this.blackCoverIn = game.add.tween(this.blackCover).to({alpha: 0.5}, this.tween.speed, this.tween.methodLinear, false); 

    this.endingBGIn = game.add.tween(this.endingBrownBG).to({alpha: 1}, this.tween.speed, this.tween.methodLinear, false, this.endingBGDelay); 
  },

  makeIconTween:function(){
    this.iconWorkIn = game.add.tween(this.icon.work.button).to({alpha: 1}, this.icon.speed, this.tween.methodLinear, false, this.joseph.speed + this.icon.delay);  
    this.iconWorkTxtIn = game.add.tween(this.icon.work.txt).to({alpha: 1}, this.icon.speed, this.tween.methodLinear, false, this.joseph.speed + this.icon.delay);  
    this.iconWorkOut = game.add.tween(this.icon.work.button).to({alpha: 0}, this.icon.speed, this.tween.methodLinear, false);  
    this.iconWorkChooseIn = game.add.tween(this.icon.work.choose.sprite).to({alpha: 0.6}, this.tween.speed, this.tween.methodLinear, false);  
    this.iconWorkChooseOut = game.add.tween(this.icon.work.choose.sprite).to({alpha: 0}, this.tween.speed, this.tween.methodLinear, false);  
    this.iconWorkDialogIn = game.add.tween(this.icon.work.dialog.sprite).to({alpha: 1}, this.tween.speed, this.tween.methodLinear, false);  
    utils.chainTween(this.iconWorkDialogIn, this.endingBGIn);
    this.iconWorkDialogOut = game.add.tween(this.icon.work.dialog.sprite).to({alpha: 0}, this.tween.speed, this.tween.methodLinear, false);  

    this.iconLeisureIn = game.add.tween(this.icon.leisure.button).to({alpha: 1}, this.icon.speed, this.tween.methodLinear, false, this.joseph.speed + this.icon.delay);  
    this.iconLeisureTxtIn = game.add.tween(this.icon.leisure.txt).to({alpha: 1}, this.icon.speed, this.tween.methodLinear, false, this.joseph.speed + this.icon.delay);  
    this.iconLeisureOut = game.add.tween(this.icon.leisure.button).to({alpha: 0}, this.icon.speed, this.tween.methodLinear, false);  
    this.iconLeisureChooseIn = game.add.tween(this.icon.leisure.choose.sprite).to({alpha: 0.6}, this.tween.speed, this.tween.methodLinear, false);  
    this.iconLeisureChooseOut = game.add.tween(this.icon.leisure.choose.sprite).to({alpha: 0}, this.tween.speed, this.tween.methodLinear, false);  

    this.iconHometownIn = game.add.tween(this.icon.hometown.button).to({alpha: 1}, this.icon.speed, this.tween.methodLinear, false, this.joseph.speed + this.icon.delay);  
    this.iconHometownTxtIn = game.add.tween(this.icon.hometown.txt).to({alpha: 1}, this.icon.speed, this.tween.methodLinear, false, this.joseph.speed + this.icon.delay);  
    this.iconHometownOut = game.add.tween(this.icon.hometown.button).to({alpha: 0}, this.icon.speed, this.tween.methodLinear, false);  
    this.iconHometownChooseIn = game.add.tween(this.icon.hometown.choose.sprite).to({alpha: 0.6}, this.tween.speed, this.tween.methodLinear, false);  
    this.iconHometownChooseOut = game.add.tween(this.icon.hometown.choose.sprite).to({alpha: 0}, this.tween.speed, this.tween.methodLinear, false);  
  },

  makeIconButtons:function(){
    this.icon.work.button = game.make.button(this.icon.work.x, this.icon.work.y, 'home_to_work_sprite', this.toWorkClick,this, 0, 0);
    this.icon.work.txt = game.make.text(this.icon.work.x, this.icon.work.y + this.icon.txtDistance, this.icon.work.word, this.icon.txtStyle);
    this.icon.work.button.onInputOver.add(this.toWorkOver, this);
    this.icon.work.button.onInputOut.add(this.toWorkOut, this);
    this.icon.work.choose.sprite = game.make.sprite(this.icon.work.choose.x, this.icon.work.choose.y, 'home_to_work_hover');
    this.icon.work.dialog.sprite = game.make.sprite(this.icon.work.dialog.x, this.icon.work.dialog.y, 'home_c_icon_to_work_dialog');

    this.icon.leisure.button = game.make.button(this.icon.leisure.x, this.icon.leisure.y, 'home_leisure_sprite', this.leisureClick, this, 0,0);
    this.icon.leisure.txt = game.make.text(this.icon.leisure.x, this.icon.leisure.y + this.icon.txtDistance, this.icon.leisure.word, this.icon.txtStyle);
    this.icon.leisure.button.onInputOver.add(this.toLeisureOver, this);
    this.icon.leisure.button.onInputOut.add(this.toLeisureOut, this); 
    this.icon.leisure.choose.sprite = game.make.sprite(this.icon.leisure.choose.x, this.icon.leisure.choose.y, 'home_leisure_hover');


    this.icon.hometown.button = game.make.button(this.icon.hometown.x, this.icon.hometown.y, 'home_hometown_sprite', this.toHometownClick. this, 0, 0);
    this.icon.hometown.txt = game.make.text(this.icon.hometown.x, this.icon.hometown.y + this.icon.txtDistance, this.icon.hometown.word, this.icon.txtStyle);
    this.icon.hometown.button.onInputOver.add(this.toHometownOver, this);
    this.icon.hometown.button.onInputOut.add(this.toHometownOut, this); 
    this.icon.hometown.choose.sprite = game.make.sprite(this.icon.hometown.choose.x, this.icon.hometown.choose.y, 'home_hometown_hover');

  },

  makeBoxGroupsTween:function(){
    this.docGroupIn = game.add.tween(this.docGroup).to({ alpha: 1, y:this.documentButton.y+this.documentButton.height/2 - this.boxDistance}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.docGroupBack = game.add.tween(this.docGroup).to({ alpha: 0, y:this.documentButton.y+this.documentButton.height/2 - this.boxDistance + this.tween.boxDistance}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.docGroupOut = game.add.tween(this.docGroup).to({ alpha: 0}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.docAnnoIn = game.add.tween(this.docAnno).to({ alpha: 1}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.docAnnoOut = game.add.tween(this.docAnno).to({ alpha: 0}, this.tween.boxSpeed, this.tween.methodLinear, false);

    this.saddleGroupIn = game.add.tween(this.saddleGroup).to({ alpha: 1, y:this.saddleButton.y+this.saddleButton.height/2 - this.boxDistance}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.saddleGroupBack = game.add.tween(this.saddleGroup).to({ alpha: 0, y:this.saddleButton.y+this.saddleButton.height/2 - this.boxDistance + this.tween.boxDistance}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.saddleGroupOut = game.add.tween(this.saddleGroup).to({ alpha: 0}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.saddleAnnoIn = game.add.tween(this.saddleAnno).to({ alpha: 1}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.saddleAnnoOut = game.add.tween(this.saddleAnno).to({ alpha: 0}, this.tween.boxSpeed, this.tween.methodLinear, false);

    this.stickGroupIn = game.add.tween(this.stickGroup).to({ alpha: 1, y:this.stickButton.y+this.stickButton.height/2 - this.boxDistance}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.stickGroupBack = game.add.tween(this.stickGroup).to({ alpha: 0, y:this.stickButton.y+this.stickButton.height/2 - this.boxDistance + this.tween.boxDistance}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.stickGroupOut = game.add.tween(this.stickGroup).to({ alpha: 0}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.stickAnnoIn = game.add.tween(this.stickAnno).to({ alpha: 1}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.stickAnnoOut = game.add.tween(this.stickAnno).to({ alpha: 0}, this.tween.boxSpeed, this.tween.methodLinear, false);

    this.hatGroupIn = game.add.tween(this.hatGroup).to({ alpha: 1, y:this.hatButton.y+this.hatButton.height/2 - this.boxDistance}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.hatGroupBack = game.add.tween(this.hatGroup).to({ alpha: 0, y:this.hatButton.y+this.hatButton.height/2 - this.boxDistance + this.tween.boxDistance}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.hatGroupOut = game.add.tween(this.hatGroup).to({ alpha: 0}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.hatAnnoIn = game.add.tween(this.hatAnno).to({ alpha: 1}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.hatAnnoOut = game.add.tween(this.hatAnno).to({ alpha: 0}, this.tween.boxSpeed, this.tween.methodLinear, false);

    this.raincoatGroupIn = game.add.tween(this.raincoatGroup).to({ alpha: 1, y:this.raincoatButton.y+this.raincoatButton.height/2 - this.boxDistance}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.raincoatGroupBack = game.add.tween(this.raincoatGroup).to({ alpha: 0, y:this.raincoatButton.y+this.raincoatButton.height/2 - this.boxDistance + this.tween.boxDistance}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.raincoatGroupOut = game.add.tween(this.raincoatGroup).to({ alpha: 0}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.raincoatAnnoIn = game.add.tween(this.raincoatAnno).to({ alpha: 1}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.raincoatAnnoOut = game.add.tween(this.raincoatAnno).to({ alpha: 0}, this.tween.boxSpeed, this.tween.methodLinear, false);

    this.umbrellaGroupIn = game.add.tween(this.umbrellaGroup).to({ alpha: 1, y:this.umbrellaButton.y+this.umbrellaButton.height/2 - this.boxDistance}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.umbrellaGroupBack = game.add.tween(this.umbrellaGroup).to({ alpha: 0, y:this.umbrellaButton.y+this.umbrellaButton.height/2 - this.boxDistance + this.tween.boxDistance}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.umbrellaGroupOut = game.add.tween(this.umbrellaGroup).to({ alpha: 0}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.umbrellaAnnoIn = game.add.tween(this.umbrellaAnno).to({ alpha: 1}, this.tween.boxSpeed, this.tween.methodLinear, false);
    this.umbrellaAnnoOut = game.add.tween(this.umbrellaAnno).to({ alpha: 0}, this.tween.boxSpeed, this.tween.methodLinear, false);
  },

  makeItemButtons:function(){
    this.documentButton = game.make.button(888, 690, 'home_document_sprite', this.documentOnClick, this, 1, 0);
    this.documentButton.onInputOver.add(this.documentOver, this);
    this.documentButton.onInputOut.add(this.documentOut, this);
    this.saddleButton = game.make.button(807, 475, 'home_saddle_sprite', this.saddleOnClick, this, 1, 0);
    this.saddleButton.onInputOver.add(this.saddleOver, this);
    this.saddleButton.onInputOut.add(this.saddleOut, this);
    this.stickButton = game.make.button(556, 605, 'home_stick_sprite', this.stickOnClick, this, 1, 0);
    this.stickButton.onInputOver.add(this.stickOver, this);
    this.stickButton.onInputOut.add(this.stickOut, this);
    this.hatButton = game.make.button(1266, 474, 'home_hat_sprite', this.hatOnClick, this, 1, 0);
    this.hatButton.onInputOver.add(this.hatOver, this);
    this.hatButton.onInputOut.add(this.hatOut, this);
    this.raincoatButton = game.make.button(1673, 396, 'home_raincoat_sprite', this.raincoatOnClick, this, 1, 0);
    this.raincoatButton.onInputOver.add(this.raincoatOver, this);
    this.raincoatButton.onInputOut.add(this.raincoatOut, this);
    this.umbrellaButton = game.make.button(1434, 447, 'home_umbrella_sprite', this.umbrellaOnClick, this, 1, 0);
    this.umbrellaButton.onInputOver.add(this.umbrellaOver, this);
    this.umbrellaButton.onInputOut.add(this.umbrellaOut, this);
  },

  makeBoxTxts:function(){
    this.docBox = game.make.sprite(0, 0, 'home_b_dialog_box');
    this.docTxt = game.make.text(0, 0, this.txt.doc, {font: "28px SansCJK", fill: 'white'});
    this.docAnno = game.make.text(this.documentButton.x+this.documentButton.width/2, this.documentButton.y+this.documentButton.height/2, this.annoTxt.doc, {font: "28px SansCJK", fill: 'black'});
    this.saddleBox = game.make.sprite(0, 0, 'home_b_dialog_box');
    this.saddleTxt = game.make.text(0, 0, this.txt.saddle, {font: "28px SansCJK", fill: 'white'});
    this.saddleAnno = game.make.text(this.saddleButton.x+this.saddleButton.width/2, this.saddleButton.y+this.saddleButton.height/2, this.annoTxt.saddle, {font: "28px SansCJK", fill: 'black'});
    this.stickBox = game.make.sprite(0, 0, 'home_b_dialog_box');
    this.stickTxt = game.make.text(0, 0, this.txt.stick, {font: "28px SansCJK", fill: 'white'});
    this.stickAnno = game.make.text(this.stickButton.x+this.stickButton.width/2, this.stickButton.y+this.stickButton.height/2, this.annoTxt.stick, {font: "28px SansCJK", fill: 'black'});
    this.hatBox = game.make.sprite(0, 0, 'home_b_dialog_box');
    this.hatTxt = game.make.text(0, 0, this.txt.hat, {font: "28px SansCJK", fill: 'white'});
    this.hatAnno = game.make.text(this.hatButton.x+this.hatButton.width/2, this.hatButton.y+this.hatButton.height/2, this.annoTxt.hat, {font: "28px SansCJK", fill: 'black'});
    this.raincoatBox = game.make.sprite(0, 0, 'home_b_dialog_box');
    this.raincoatTxt = game.make.text(0, 0, this.txt.raincoat, {font: "28px SansCJK", fill: 'white'});
    this.raincoatAnno = game.make.text(this.raincoatButton.x+this.raincoatButton.width/2, this.raincoatButton.y+this.raincoatButton.height/2, this.annoTxt.raincoat, {font: "28px SansCJK", fill: 'black'});
    this.umbrellaBox = game.make.sprite(0, 0, 'home_b_dialog_box');
    this.umbrellaTxt = game.make.text(0, 0, this.txt.umbrella, {font: "28px SansCJK", fill: 'white'});
    this.umbrellaAnno = game.make.text(this.umbrellaButton.x+this.umbrellaButton.width/2, this.umbrellaButton.y+this.umbrellaButton.height/2, this.annoTxt.umbrella, {font: "28px SansCJK", fill: 'black'});
  },

  addTxtBoxGroups:function(){
    this.docGroup = game.add.group(); 
    this.docGroup.x = this.documentButton.x + this.documentButton.width/2;
    this.docGroup.y = this.documentButton.y + this.documentButton.height/2 - this.boxDistance + this.tween.boxDistance;

    this.saddleGroup = game.add.group(); 
    this.saddleGroup.x = this.saddleButton.x + this.saddleButton.width/2;
    this.saddleGroup.y = this.saddleButton.y + this.saddleButton.height/2 - this.boxDistance + this.tween.boxDistance;

    this.stickGroup = game.add.group(); 
    this.stickGroup.x = this.stickButton.x + this.stickButton.width/2;
    this.stickGroup.y = this.stickButton.y + this.stickButton.height/2 - this.boxDistance + this.tween.boxDistance;

    this.hatGroup = game.add.group(); 
    this.hatGroup.x = this.hatButton.x + this.hatButton.width/2;
    this.hatGroup.y = this.hatButton.y + this.hatButton.height/2 - this.boxDistance + this.tween.boxDistance;

    this.umbrellaGroup = game.add.group(); 
    this.umbrellaGroup.x = this.umbrellaButton.x + this.umbrellaButton.width/2;
    this.umbrellaGroup.y = this.umbrellaButton.y + this.umbrellaButton.height/2 - this.boxDistance + this.tween.boxDistance;

    this.raincoatGroup = game.add.group(); 
    this.raincoatGroup.x = this.raincoatButton.x + this.raincoatButton.width/2;
    this.raincoatGroup.y = this.raincoatButton.y + this.raincoatButton.height/2 - this.boxDistance + this.tween.boxDistance;

    utils.addExistingMultiple([this.docBox, this.docTxt, this.saddleBox, this.saddleTxt, this.hatBox, this.hatTxt, this.stickBox, this.stickTxt,
      this.umbrellaBox, this.umbrellaTxt, this.raincoatBox, this.raincoatTxt, this.docAnno, this.saddleAnno, this.hatAnno, this.stickAnno,
      this.umbrellaAnno, this.raincoatAnno]);

    this.docGroup.addMultiple([this.docBox, this.docTxt]);
    this.saddleGroup.addMultiple([this.saddleBox, this.saddleTxt]);
    this.stickGroup.addMultiple([this.stickBox, this.stickTxt]);
    this.hatGroup.addMultiple([this.hatBox, this.hatTxt]);
    this.raincoatGroup.addMultiple([this.raincoatBox, this.raincoatTxt]);
    this.umbrellaGroup.addMultiple([this.umbrellaBox, this.umbrellaTxt]);
  },

  toWorkClick:function(){
    this.iconWorkDialogIn.start();
    this.disableAllButtons();

    //delay and switch state
    setTimeout(function () {
      game.state.start("WorkChooseScene");
    }, this.switchStateDelay); 
  },

  leisureClick:function(){

  },

  toHometownClick:function(){

  },

  toWorkOver:function(){
    this.iconWorkChooseIn.start();
  },
  toWorkOut:function(){
    this.iconWorkChooseOut.start();
  },

  toHometownOver:function(){
    this.iconHometownChooseIn.start();
  },
  toHometownOut:function(){
    this.iconHometownChooseOut.start();
  },

  toLeisureOver:function(){
    this.iconLeisureChooseIn.start();
  },
  toLeisureOut:function(){
    this.iconLeisureChooseOut.start();
  },

  documentOnClick: function (){
    // disable button, fade out button and box 
    this.disableButton(this.documentButton);
    this.docGroupOut.start();
    this.documentOut.start();
    this.docAnnoOut.start();
    this.addClickCount();
  },
  documentOver:function(){
    this.docGroupIn.start();
    this.docAnnoIn.start();
  },
  documentOut:function(){
    this.docGroupBack.start();
    this.docAnnoOut.start();
  },

  saddleOnClick: function (){
    this.disableButton(this.saddleButton);
    this.saddleGroupOut.start();
    this.saddleOut.start();
    this.saddleAnnoOut.start();
    this.addClickCount();
  },
  saddleOver:function(){
    this.saddleGroupIn.start();
    this.saddleAnnoIn.start();
  },
  saddleOut:function(){
    this.saddleGroupBack.start();
    this.saddleAnnoOut.start();
  },

  stickOnClick: function (){
    this.disableButton(this.stickButton);
    this.stickGroupOut.start();
    this.stickOut.start();
    this.stickAnnoOut.start();
    this.addClickCount();
  }, 
  stickOver:function(){
    this.stickGroupIn.start();
    this.stickAnnoIn.start();
  },
  stickOut:function(){
    this.stickGroupBack.start();
    this.stickAnnoOut.start();
  },

  hatOnClick: function (){
    this.disableButton(this.hatButton);
    this.hatGroupOut.start();
    this.hatOut.start();
    this.hatAnnoOut.start();
    this.addClickCount();
  }, 
  hatOver:function(){
    this.hatGroupIn.start();
    this.hatAnnoIn.start();
  },
  hatOut:function(){
    this.hatGroupBack.start();
    this.hatAnnoOut.start();
  },

  raincoatOnClick: function (){
    this.disableButton(this.raincoatButton);
    this.raincoatGroupOut.start();
    this.raincoatOut.start();
    this.raincoatAnnoOut.start();
    this.addClickCount();
  }, 
  raincoatOver:function(){
    this.raincoatGroupIn.start();
    this.raincoatAnnoIn.start();
  },
  raincoatOut:function(){
    this.raincoatGroupBack.start();
    this.raincoatAnnoOut.start();
  },

  umbrellaOnClick: function (){
    this.disableButton(this.umbrellaButton);
    this.umbrellaGroupOut.start();
    this.umbrellaOut.start();
    this.umbrellaAnnoOut.start();
    this.addClickCount();
  }, 
  umbrellaOver:function(){
    this.umbrellaGroupIn.start();
    this.umbrellaAnnoIn.start();
  },
  umbrellaOut:function(){
    this.umbrellaGroupBack.start();
    this.umbrellaAnnoOut.start();
  },

  enableItemButtons:function(){
    this.documentButton.inputEnabled = true; 
    this.saddleButton.inputEnabled = true;
    this.hatButton.inputEnabled = true;
    this.stickButton.inputEnabled = true;
    this.umbrellaButton.inputEnabled = true;
    this.raincoatButton.inputEnabled = true;
  },

  enableIconButtons:function(){
    this.icon.work.button.inputEnabled = true;

    // this.icon.leisure.button.inputEnabled = true;;
    // this.icon.hometown.button.inputEnabled = true;
  },

  disableAllButtons:function(){
    this.documentButton.inputEnabled = false; 
    this.saddleButton.inputEnabled = false; 
    this.hatButton.inputEnabled = false;
    this.stickButton.inputEnabled = false; 
    this.umbrellaButton.inputEnabled = false; 
    this.raincoatButton.inputEnabled = false; 

    this.icon.work.button.inputEnabled = false;
    this.icon.leisure.button.inputEnabled = false;
    this.icon.hometown.button.inputEnabled = false;
  },

  disableButton:function(item){
    item.inputEnabled = false;
  },

  loadJson:function(){
    this.dialog.speed = settingsJSON.home_scene.dialog_speed;
    this.dialog.delay = settingsJSON.home_scene.dialog_delay;
    this.dialog.txtSpeed = settingsJSON.home_scene.dialog_txt_speed;
    this.dialog.txtDelay = settingsJSON.home_scene.dialog_txt_extra_delay;
    this.dialog.txt2Delay = settingsJSON.home_scene.dialog_txt_2_extra_delay;
    this.dialog.txt2DelaySpace = settingsJSON.home_scene.dialog_txt_2_extra_delay_space;
    this.icon.speed = settingsJSON.home_scene.icon_speed;
    this.icon.delay = settingsJSON.home_scene.icon_delay;
  },

  loadJson:function(){
    this.startTxt[0] = settingsJSON.starting_texts[0];
    this.startTxt[1] = settingsJSON.starting_texts[1];
  }
};
