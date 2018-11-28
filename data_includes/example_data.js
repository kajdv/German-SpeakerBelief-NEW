// This tells Ibex you will send the results early
var manualSendResults = true;
var showProgressBar = true;
var shuffleSequence = seq("consent","instructions","scaleinstr","distract",randomize("Practice"),randomize("experiment"),"feedback","send","prolificConf");
PennController.ResetPrefix(null);


var items = [

   // ["setcounter", "__SetCounter__", { } ]
   // ,    
    ["consent", "PennController", PennController(
        newHtml("consent", "ProlificConsent.html")
            .settings.log()
            .print()
        ,
        newButton("consent btn", "Ich willige ein, dieses Experiment zu machen.")
            .print()
            .wait( getHtml("consent").test.complete().failure( getHtml("consent").warn() ) )
    )]
    ,
    ["instructions", "PennController", PennController(
        newHtml("instructions form", "TaskInstructions-AH-belief.html")
            .print()
        ,
        newButton("continue btn", "Klicken Sie hier, um fortzufahren.")
            .print()
            .wait()
    )]
    ,
    ["scaleinstr", "PennController", PennController(
        newHtml("scale form", "Scale.html")
            .print()
        ,
        newButton("continue btn", "Weiter.")  
            .print()
            .wait( getHtml("scale form").test.complete().failure(getHtml("scale form").warn()) )
    )]
    ,     
    ["distract", "PennController", PennController(
        newHtml("distract form", "DistractionsOff.html")
            .print()
        ,
        newButton("continue btn", "Weiter.")
            .print()
            .wait( getHtml("distract form").test.complete().failure(getHtml("distract form").warn()) )
    )] 
    ,      
    ["feedback", "PennController", PennController(
        newHtml("feedback form", "ProlificFeedback.html")
            .settings.log()
            .print()
        ,
        newButton("continue to confirm", "Klicken Sie hier, um fortzufahren.")
            .settings.bold()
            .print()
            .wait( getHtml("feedback form").test.complete().failure(getHtml("feedback form").warn()) )              
    )]
    ,      
    ["send", "__SendResults__", {}]   
    ,
    ["prolificConf", "PennController", PennController(
        newHtml("thanks", "ProlificConfirmation.html")
            .settings.log()
            .print() 
        ,
        newButton("continue btn", "Jag &auml;r klar.")
            .settings.bold()
     //       .print()
            .wait()                 
    )]                     
];

//PennController.GetTable( "GER-datasource-AH-bel.csv" ).setLabel("Expt");

PennController.FeedItems( PennController.GetTable( "GER-datasource-AH-bel.csv" ).setLabel("Expt"),//.filter("Expt","experiment"),
    (item) => PennController(
        newTimer("blank", 1000)
            .start()
            .wait()
        ,    
        newTooltip("instructions", "Klicken Sie die Leertaste, um fortzufahren.")
            .settings.size(180, 25)
            .settings.position("bottom center")
            .settings.key(" ", "no click")
        ,
        newCanvas("stimbox", 850, 190)
            .settings.add(25,40,
                newText("context", item.Background)
                    .settings.size(700, 30)
            )
            .settings.add(25, 85,
                newText("context", item.Says)
                    .settings.size(700, 30)
            )               
            .settings.add(25,130,
                newText("stimuli", item.Stims)
                    .settings.italic()
                    .settings.size(700, 30)                  
            )
            .print()
        ,
        newTimer("transit", 1000)
            .start()
            .wait()
        ,   
        newScale("answer", 9)
            .settings.log()
        ,
        newCanvas("answerbox", 850, 150) 
            .settings.add(25,40, newText("claim", item.Claim).settings.size(700, 30) )
            .settings.add(25,85, newText("labelLeft", "Nein").settings.bold() )
            .settings.add(60,80, getScale("answer").settings.size(200, 0) )
            .settings.add(290,85, newText("labeRight", "Ja").settings.bold() )
            .settings.add(136,105, newText("labelMid", "K&ouml;nnte sein").settings.bold() )            
            .print()   
        ,
        newText("warning","Bitte w&auml;hlen Sie eine Antwort aus.")
            .settings.hidden()
            .settings.color("red")
            .settings.bold()
            .settings.css("margin-left", 50 )
            .print()
        ,
        newButton("validate", "Weiter.")
            .settings.center()
            .print()    
            .wait(getScale("answer")
                  .test.selected()
                  .failure(getText("warning")
                           .settings.visible()
                          )
                 )        

    ).log("Expt", item.Expt)
    .log("ExptType", item.ExptType)
    .log("ItemName", item.ItemName)
    .log("Tense", item.Tense)
    .log("polarity", item.polarity)
    .log("EmbPred", item.EmbPred)
    .log("lemma", item.lemma)
    .log("Group", item.Group)
    .log("Item", item.Item)
    .log("NoExpt", item.NoExpt)
    .log("EmbCondition", item.EmbCondition)
    .log("mcpred", item.mcpred) 
  //  .log("Stims", item.Stims)     
    .log("PROLIFIC_PID", PennController.GetURLParameter("PROLIFIC_PID"))

);





