/* ---------- DSM-5 diagnosis list (autocomplete pool) ---------- */
const DIAGNOSES = [
  // ---- Depressive disorders ----
  "Major Depressive Disorder (MDD)",
  "Major Depressive Disorder, With Psychotic Features",
  "Major Depressive Disorder, With Anxious Distress",
  "Major Depressive Disorder, With Melancholic Features",
  "Major Depressive Disorder, With Peripartum Onset",
  "Major Depressive Disorder, With Seasonal Pattern",
  "Persistent Depressive Disorder (Dysthymia)",
  "Disruptive Mood Dysregulation Disorder (DMDD)",
  "Premenstrual Dysphoric Disorder (PMDD)",
  // ---- Bipolar disorders ----
  "Bipolar I Disorder",
  "Bipolar I Disorder, With Psychotic Features",
  "Bipolar I Disorder, With Rapid Cycling",
  "Bipolar II Disorder",
  "Cyclothymic Disorder",
  // ---- Anxiety disorders ----
  "Generalized Anxiety Disorder (GAD)","Panic Disorder","Agoraphobia",
  "Social Anxiety Disorder (Social Phobia)","Specific Phobia","Separation Anxiety Disorder",
  "Selective Mutism",
  // ---- OCD & related ----
  "Obsessive-Compulsive Disorder (OCD)","Body Dysmorphic Disorder (BDD)",
  "Hoarding Disorder","Trichotillomania (Hair-Pulling Disorder)","Excoriation (Skin-Picking) Disorder",
  // ---- Trauma & stressor ----
  "Post-Traumatic Stress Disorder (PTSD)",
  "Post-Traumatic Stress Disorder, With Dissociative Symptoms",
  "Acute Stress Disorder","Adjustment Disorder",
  "Reactive Attachment Disorder","Disinhibited Social Engagement Disorder",
  // ---- Schizophrenia spectrum & psychotic ----
  "Schizophrenia","Schizoaffective Disorder","Schizophreniform Disorder",
  "Brief Psychotic Disorder","Delusional Disorder","Schizotypal Personality Disorder",
  // ---- Neurodevelopmental ----
  "Attention-Deficit/Hyperactivity Disorder (ADHD)",
  "ADHD, Predominantly Inattentive Presentation",
  "ADHD, Predominantly Hyperactive-Impulsive Presentation",
  "ADHD, Combined Presentation",
  "Autism Spectrum Disorder (ASD)",
  "Intellectual Disability (ID)","Specific Learning Disorder (SLD)","Tourette's Disorder",
  // ---- Feeding & eating ----
  "Anorexia Nervosa, Restricting Type",
  "Anorexia Nervosa, Binge-Eating/Purging Type",
  "Bulimia Nervosa","Binge-Eating Disorder (BED)",
  "Avoidant/Restrictive Food Intake Disorder (ARFID)",
  "Pica","Rumination Disorder",
  // ---- Sleep-wake ----
  "Insomnia Disorder","Hypersomnolence Disorder","Narcolepsy","Nightmare Disorder",
  // ---- Substance & addictive ----
  "Alcohol Use Disorder (AUD)","Opioid Use Disorder (OUD)","Stimulant Use Disorder","Cannabis Use Disorder",
  "Gambling Disorder",
  // ---- Somatic ----
  "Somatic Symptom Disorder","Illness Anxiety Disorder","Conversion Disorder (Functional Neurological Symptom Disorder)",
  "Factitious Disorder",
  // ---- Dissociative ----
  "Dissociative Identity Disorder (DID)","Dissociative Amnesia","Depersonalization/Derealization Disorder",
  // ---- Personality ----
  "Borderline Personality Disorder (BPD)","Narcissistic Personality Disorder (NPD)","Antisocial Personality Disorder (ASPD)",
  "Histrionic Personality Disorder","Avoidant Personality Disorder","Dependent Personality Disorder",
  "Obsessive-Compulsive Personality Disorder (OCPD)","Paranoid Personality Disorder","Schizoid Personality Disorder",
  // ---- Disruptive, impulse-control & conduct ----
  "Oppositional Defiant Disorder (ODD)","Conduct Disorder","Intermittent Explosive Disorder (IED)","Kleptomania","Pyromania",
  // ---- Neurocognitive ----
  "Delirium","Major Neurocognitive Disorder (Dementia)","Mild Neurocognitive Disorder",
  // ---- Other ----
  "Gender Dysphoria",
  "No diagnosis (culturally normative)"
];
/* extra search aliases (mostly abbreviations) so entries are easy to find by typing the short form */
const SEARCH_ALIASES = {
  "Major Depressive Disorder (MDD)":"mdd depression clinical major depressive",
  "Persistent Depressive Disorder (Dysthymia)":"pdd dysthymia",
  "Disruptive Mood Dysregulation Disorder (DMDD)":"dmdd",
  "Premenstrual Dysphoric Disorder (PMDD)":"pmdd",
  "Generalized Anxiety Disorder (GAD)":"gad anxiety",
  "Social Anxiety Disorder (Social Phobia)":"sad social phobia",
  "Obsessive-Compulsive Disorder (OCD)":"ocd",
  "Body Dysmorphic Disorder (BDD)":"bdd",
  "Post-Traumatic Stress Disorder (PTSD)":"ptsd trauma",
  "Post-Traumatic Stress Disorder, With Dissociative Symptoms":"ptsd dissociative",
  "Acute Stress Disorder":"asd acute stress",
  "Attention-Deficit/Hyperactivity Disorder (ADHD)":"adhd add attention deficit",
  "ADHD, Predominantly Inattentive Presentation":"adhd add inattentive adhd pi",
  "ADHD, Predominantly Hyperactive-Impulsive Presentation":"adhd hyperactive impulsive",
  "ADHD, Combined Presentation":"adhd combined",
  "Autism Spectrum Disorder (ASD)":"asd autism asperger aspergers",
  "Intellectual Disability (ID)":"id intellectual disability mr",
  "Specific Learning Disorder (SLD)":"sld dyslexia learning",
  "Binge-Eating Disorder (BED)":"bed binge eating",
  "Avoidant/Restrictive Food Intake Disorder (ARFID)":"arfid",
  "Alcohol Use Disorder (AUD)":"aud alcoholism alcohol",
  "Opioid Use Disorder (OUD)":"oud opioid",
  "Dissociative Identity Disorder (DID)":"did multiple personality",
  "Borderline Personality Disorder (BPD)":"bpd borderline",
  "Narcissistic Personality Disorder (NPD)":"npd narcissist",
  "Antisocial Personality Disorder (ASPD)":"aspd antisocial sociopath psychopath",
  "Obsessive-Compulsive Personality Disorder (OCPD)":"ocpd",
  "Oppositional Defiant Disorder (ODD)":"odd oppositional",
  "Intermittent Explosive Disorder (IED)":"ied anger",
  "Major Neurocognitive Disorder (Dementia)":"dementia alzheimers ncd",
  "No diagnosis (culturally normative)":"none no diagnosis normal healthy not a disorder cultural"
};

/* ---------- Cases: 3 per difficulty (escalating clues) ----------
   Each case has a `date` (YYYY-MM-DD) release date. Cases dated in the
   future are hidden; the released case with the latest date is "today's". */
const CASES = {
  easy: [
    {
      id:"easy-mdd", date:"2026-06-28", answer:"Major Depressive Disorder",
      accept:["major depressive disorder","major depression","mdd","depression","clinical depression"],
      clues:[
        "A 34-year-old client comes in saying they've felt \"empty and heavy\" for about two months. They aren't totally sure why they came today — a friend pushed them to.",
        "They describe low, sad mood nearly every day, and say they've lost interest in playing guitar and seeing friends — things that used to bring them joy.",
        "They sleep 10–11 hours but still feel exhausted, struggle to concentrate at work, and voice feelings of worthlessness and guilt.",
        "Their appetite is down with unintentional weight loss. No history of elevated or expansive mood, no substance use, and no medical cause on workup.",
        "Five-plus symptoms — including depressed mood and loss of interest — nearly every day for over two weeks, causing clear impairment. The client has good insight that this is a change from their usual self."
      ],
      teach:"A textbook presentation: ≥5 symptoms (incl. depressed mood or anhedonia) for ≥2 weeks, functional impairment, no manic/hypomanic history."
    },
    {
      id:"easy-panic", date:"2026-06-27", answer:"Panic Disorder",
      accept:["panic disorder","panic","panic attacks","panic attack disorder"],
      clues:[
        "A 29-year-old comes in worried about their heart. They've had several sudden episodes of intense fear in the past month and even went to the ER convinced something was seriously wrong.",
        "The episodes come on abruptly and peak within minutes — pounding heart, shortness of breath, sweating, trembling, and a feeling of impending doom.",
        "A full medical workup including ECG was normal. The attacks sometimes strike \"out of the blue,\" even while relaxing at home.",
        "Between attacks they now worry constantly about the next one and have started avoiding the gym and coffee in case those set one off.",
        "Recurrent unexpected panic attacks plus a month or more of persistent worry about more attacks and behavior change to prevent them — not due to a substance or medical condition. Good insight: they know the fear is out of proportion."
      ],
      teach:"Hallmark: recurrent unexpected panic attacks followed by ≥1 month of anticipatory worry or avoidance, with medical causes ruled out."
    },
    {
      id:"easy-gad", date:"2026-06-26", answer:"Generalized Anxiety Disorder",
      accept:["generalized anxiety disorder","generalised anxiety disorder","gad","generalized anxiety","generalised anxiety"],
      clues:[
        "A 41-year-old says they've been \"a worrier their whole life,\" but the past eight months have felt unmanageable.",
        "They worry about many different things — work, finances, their kids' safety, their own health — and find the worry very hard to control, most days.",
        "They report feeling restless and on edge, with muscle tension, poor sleep, irritability, and trouble concentrating.",
        "There's no discrete panic-attack pattern and no single feared object or situation; the anxiety is diffuse and free-floating across many areas of life.",
        "Excessive, hard-to-control anxiety and worry more days than not for at least six months, with multiple physical symptoms and clear distress — not better explained by another disorder. Good insight."
      ],
      teach:"Differentiated from panic (no discrete attacks) and phobia (no single trigger): pervasive worry ≥6 months plus physical symptoms like restlessness, tension, and poor sleep."
    },
    {
      id:"easy-sad", date:"2026-06-25", answer:"Social Anxiety Disorder",
      accept:["social anxiety disorder","social phobia","social anxiety disorder social phobia","social anxiety","sad"],
      clues:[
        "A 19-year-old college freshman comes in saying they've been struggling since starting school. They're fine one-on-one with people they know, but most situations involving others feel unbearable.",
        "They avoid eating in the dining hall, speaking in class, and going to parties — not because they don't want to, but because they're terrified of doing something embarrassing or being judged.",
        "In feared situations they sweat, shake, and their mind goes blank. They've been skipping classes with participation grades rather than risk speaking out loud.",
        "They recognize the fear is out of proportion to the actual threat, but that knowledge doesn't help in the moment. Their grades are slipping and they've made no close friends.",
        "Marked fear of social situations in which they may be scrutinized, leading to avoidance or endurance with intense anxiety, out of proportion to the actual threat, lasting at least 6 months, with significant impairment. Good insight."
      ],
      teach:"Core feature: fear of negative evaluation in social situations with associated avoidance. Distinguish from GAD (which adds non-social worries) and specific phobia (non-social trigger). Onset is typically in adolescence."
    },
    {
      id:"easy-ptsd", date:"2026-06-24", answer:"Post-Traumatic Stress Disorder",
      accept:["post-traumatic stress disorder","ptsd","post traumatic stress disorder","post-traumatic stress disorder ptsd","ptsd trauma"],
      clues:[
        "A 28-year-old combat veteran comes in a year after returning home. His partner urged him to seek help after he woke them up screaming for the third time last week.",
        "He describes recurring vivid nightmares and daytime flashbacks — moments when he's suddenly back in combat, heart pounding, certain he's in danger. He can't always predict what triggers them.",
        "He avoids war movies, certain roads, and news coverage. He's become emotionally withdrawn and tells his partner he feels \"dead inside.\"",
        "He's constantly scanning his environment, sleeps with a weapon nearby, and startles violently at loud noises. His irritability has led to two confrontations at work.",
        "Following a traumatic event: recurrent intrusions (nightmares, flashbacks), avoidance of trauma-related cues, negative alterations in mood and cognition, and marked hyperarousal — all lasting over a month and causing clear impairment. Limited insight — he calls it \"weakness.\""
      ],
      teach:"Four symptom clusters: intrusion, avoidance, negative alterations in cognition/mood, and hyperarousal/reactivity. Must last >1 month (if <1 month consider Acute Stress Disorder). Common for clients to attribute symptoms to personal failing rather than recognizing the disorder."
    },
    {
      id:"easy-phobia", date:"2026-06-23", answer:"Specific Phobia",
      accept:["specific phobia","specific phobia blood injection injury type","simple phobia","phobia"],
      clues:[
        "A 24-year-old is referred by their primary care doctor after fainting during a routine blood draw — not the first time. They've fainted at medical procedures before and are increasingly avoidant.",
        "They describe immediate, intense fear at the sight of needles or blood — heart races, they break out in a cold sweat, and then they feel faint. They know the danger is not real but can't override the reaction.",
        "They've refused recommended lab work, delayed a necessary dental procedure, and won't watch medical dramas. The fear is isolated to this category; everything else in life is fine.",
        "No general anxiety, no other phobias. Outside of medical encounters they function well and report good mood and no other mental health concerns.",
        "Immediate, excessive fear triggered by a specific, circumscribed stimulus — active avoidance or distress upon exposure, lasting at least 6 months, out of proportion to actual danger, causing functional impairment. Good insight."
      ],
      teach:"Specific phobia, blood-injection-injury type, uniquely features a vasovagal (fainting) response: heart rate initially rises then drops. Key: fear is bounded to one category. Avoidance of medical care is a common and dangerous consequence."
    },
    {
      id:"easy-adjustment", date:"2026-06-22", answer:"Adjustment Disorder",
      accept:["adjustment disorder","adjustment disorder with depressed mood","adjustment disorder with anxiety","adjustment disorder with mixed anxiety and depressed mood"],
      clues:[
        "A 45-year-old comes in two months after losing their job. They describe feeling sad, anxious, and unable to stop ruminating about what happened — more than they'd expect of themselves.",
        "They've had trouble sleeping, feel hopeless about the future, and have pulled away from friends. They haven't been looking for new work because \"it feels pointless.\"",
        "Symptoms track directly to the job loss. Before that they describe themselves as resilient; no significant prior history of depression or anxiety.",
        "On careful review they don't meet full criteria for a major depressive episode: not enough symptoms are present at the same time, and the distress feels entirely tied to this specific stressor.",
        "Emotional or behavioral symptoms that developed in response to an identifiable stressor, exceed what would normally be expected, and cause significant impairment — but don't meet criteria for another mental disorder. Symptoms began within 3 months of the stressor. Good insight."
      ],
      teach:"Adjustment disorder is a residual category: distress is clinically significant and stressor-linked but doesn't meet threshold for a more specific disorder. It resolves within 6 months of the stressor ending (or ongoing stressor being removed)."
    },
    {
      id:"easy-bipolar1", date:"2026-06-21", answer:"Bipolar I Disorder",
      accept:["bipolar i disorder","bipolar 1 disorder","bipolar i","bipolar 1","bipolar disorder","bipolar"],
      clues:[
        "A 23-year-old is brought to the ER by their parents after being awake for four days. They're elated, speaking very fast, and convinced they're launching a company that will change the world.",
        "They've maxed out three credit cards, sent hundreds of emails to strangers, and quit their job this week. Their speech is so fast it's hard to follow; they become irritated when others don't share their confidence.",
        "This is a dramatic departure from their baseline — normally they're described as responsible and low-key. No substance use explains the presentation; medical workup is unremarkable.",
        "They've had one past depressive episode, but nothing like this. They haven't slept meaningfully in four days and feel \"better than I've ever felt.\"",
        "A distinct period of elevated, expansive mood with increased goal-directed activity lasting over a week, with at least three manic symptoms (decreased need for sleep, grandiosity, pressured speech, reckless spending) — severe enough that hospitalization is warranted."
      ],
      teach:"A single manic episode is sufficient for Bipolar I — no depressive episode is required, though most people have them. Unlike hypomania, mania lasts ≥7 days, causes marked impairment, and may require hospitalization."
    },
    {
      id:"easy-anorexia", date:"2026-06-20", answer:"Anorexia Nervosa, Restricting Type",
      accept:["anorexia nervosa restricting type","anorexia nervosa, restricting type","anorexia nervosa","anorexia"],
      clues:[
        "A 17-year-old is brought in by their parents after eight months of weight loss. The client says they're \"just eating healthy\" and doesn't see what the concern is.",
        "They restrict intake to around 700 calories a day, avoid any food they consider \"unsafe,\" and weigh themselves multiple times daily. Their BMI is significantly below what's healthy for their age.",
        "They become visibly distressed when meals deviate from their plan. Their periods have stopped and their hair is thinning, but they say they feel fine.",
        "Asked whether they think they're too thin, they say they still \"feel fat\" and express intense fear of gaining weight — even as others can visibly see their bones.",
        "Restriction of energy intake leading to significantly low body weight; intense fear of weight gain or behavior that interferes with gaining weight; and disturbed body image or persistent lack of recognition of the seriousness of low weight. No binge or purge behavior."
      ],
      teach:"Three criteria: low weight, fear of weight gain, and distorted body image or lack of insight. Restricting type means no binge/purge behavior in the past 3 months. Physical consequences (amenorrhea, lanugo, electrolyte disturbance) signal severity."
    },
    {
      id:"easy-insomnia", date:"2026-06-19", answer:"Insomnia Disorder",
      accept:["insomnia disorder","insomnia","chronic insomnia","primary insomnia"],
      clues:[
        "A 38-year-old comes in frustrated about sleep problems going on for eight months. \"I just can't turn my brain off at night,\" they say.",
        "They lie awake one to two hours before falling asleep, then wake several times. Total sleep is four to five hours. They feel exhausted all day and have started dreading bedtime.",
        "Work performance is suffering and they're irritable at home. They've tried every sleep hygiene tip they know — nothing helps.",
        "No mood disorder, no substance use, no medical cause on workup. Interestingly, they sleep fine on vacation — which makes them suspect the problem is psychological, not physical.",
        "Difficulty initiating and maintaining sleep, occurring at least three nights a week for at least three months, causing significant daytime distress or impairment, not explained by another condition or substance. Good insight."
      ],
      teach:"Insomnia disorder requires the 3×3 rule: ≥3 nights/week, ≥3 months. Sleeping better on vacation (where performance anxiety about sleep drops) is classic and diagnostically informative, not evidence the problem is imaginary."
    },
    {
      id:"easy-aud", date:"2026-06-18", answer:"Alcohol Use Disorder",
      accept:["alcohol use disorder","alcohol use disorder aud","aud","alcoholism","alcohol dependence"],
      clues:[
        "A 46-year-old comes in at their spouse's urging. \"My wife thinks I drink too much, but I just need it to relax after work.\"",
        "They drink every evening, starting with \"two beers to take the edge off\" but most nights finishing six to eight. They've tried to cut back several times without success.",
        "They've called in sick twice because of hangovers, and their spouse says they're emotionally unavailable. They keep alcohol at work \"just in case.\"",
        "They shake in the morning until they have their first drink of the day. They've also noticed they need significantly more alcohol than they used to in order to feel the same effect.",
        "A pattern of alcohol use causing significant impairment over 12 months: tolerance, morning withdrawal tremors, drinking more than intended, repeated failed efforts to cut back, continued use despite interpersonal consequences, and craving."
      ],
      teach:"AUD is diagnosed dimensionally: 2–3 criteria = mild, 4–5 = moderate, ≥6 = severe. Morning tremors (withdrawal) and tolerance are physiological markers. Minimization and denial are part of the clinical picture, not evidence against the diagnosis."
    },
    {
      id:"easy-separation", date:"2026-06-17", answer:"Separation Anxiety Disorder",
      accept:["separation anxiety disorder","separation anxiety"],
      clues:[
        "A 32-year-old comes in after falling apart when their spouse took a two-week work trip. \"I was convinced something terrible was going to happen to them.\"",
        "They describe excessive worry about harm coming to their spouse during any separation. They called and texted constantly, couldn't sleep, and had nightmares about losing them.",
        "They've declined their own work travel because the thought of being separated is unbearable. They feel physically sick at airport drop-offs.",
        "The pattern has been present for years — a similar dynamic occurred with their mother growing up. The fear is specifically about separation from attachment figures, not about public spaces or general disaster.",
        "Excessive, developmentally inappropriate fear about separation from attachment figures — with anticipatory distress, worry about harm, and sleep difficulty when separated — lasting at least 4 weeks, causing significant impairment. Okay insight — they describe it as \"a personality flaw.\""
      ],
      teach:"Separation anxiety disorder can be diagnosed in adults (DSM-5 removed the childhood-only restriction). Key: the fear is specifically about loss of or harm to attachment figures, not public spaces (agoraphobia) or generalized catastrophe (GAD)."
    },
    {
      id:"easy-adhd-future", date:"2026-07-07", answer:"ADHD, Predominantly Inattentive Presentation",
      accept:["adhd predominantly inattentive presentation","adhd, predominantly inattentive presentation","adhd inattentive","adhd","attention deficit hyperactivity disorder","add","attention deficit disorder"],
      clues:[
        "A 9-year-old girl is referred by her teacher, who describes her as \"in her own world.\" She's quiet, compliant, and polite — but consistently turns in incomplete work and misses instructions.",
        "She daydreams frequently, loses her belongings daily, and needs instructions repeated multiple times. She can spend an hour on a task that should take ten minutes — not because she's lazy, but because her attention drifts.",
        "The same patterns appear at home: she starts getting ready for school and gets sidetracked, leaves belongings behind, and forgets what she went to the next room to do. Her parents assumed she'd grow out of it.",
        "She's bright and articulate. On topics she finds engaging she concentrates intensely. It's sustained, effortful attention that fails her. There is no hyperactivity, no impulsivity, nothing that looks like a behavior problem.",
        "At least six inattentive symptoms present across both home and school since before age 12 — careless errors, difficulty sustaining attention, seeming not to listen, not finishing tasks, forgetfulness, losing things — causing clear academic impairment, with no significant hyperactive-impulsive symptoms."
      ],
      teach:"The predominantly inattentive presentation is frequently missed in quiet, compliant children — especially girls. Without visible disruption, inattention reads as daydreaming or a learning problem. Distinguish from SLD: the difficulty is attentional, not limited to a specific skill domain.",
    },
    {
      id:"easy-delirium", date:"2026-07-08", answer:"Delirium",
      accept:["delirium","acute confusional state","acute confusion"],
      clues:[
        "A 78-year-old is brought to the ER by her daughter, who is alarmed: her mother — normally sharp and independent — has been confused since yesterday morning, picking at the bedsheets and convinced the nurses are strangers trying to harm her.",
        "The patient alternates between agitation and drowsiness throughout the interview. She cannot follow a simple three-step instruction and loses track of questions mid-sentence. She is disoriented to time and place.",
        "There is no prior psychiatric history and no known dementia. Her baseline cognitive health was excellent. The symptoms came on overnight — which her daughter emphasizes is completely unlike her mother.",
        "Lab work reveals a urinary tract infection and mild dehydration. Her daughter mentions she started a new sleep medication last week.",
        "An acute disturbance in attention and awareness — developing over hours to days, fluctuating throughout the day, representing a clear change from baseline — accompanied by disorientation and incoherent speech, with a direct physiological cause identified."
      ],
      teach:"Delirium differs from dementia in its acute onset (hours to days vs. gradual), fluctuating course, and identifiable physiological cause. UTI is a classic precipitant in older adults. Acute behavioral change in an elderly patient should prompt a medical workup before a psychiatric one.",
    },
    {
      id:"easy-adhd-child", date:"2026-06-16", answer:"Attention-Deficit/Hyperactivity Disorder",
      accept:["adhd","attention deficit hyperactivity disorder","attention-deficit/hyperactivity disorder","adhd combined presentation","adhd combined","adhd, combined presentation","add"],
      clues:[
        "An 8-year-old boy is referred by his teacher after months of classroom disruption. His parents confirm the same behaviors appear at home and in after-school activities.",
        "He blurts out answers before questions are finished, can't wait his turn in games, and gets out of his seat constantly. He's described as \"always on the go, like driven by a motor.\"",
        "He also loses assignments, forgets to bring home materials, and can't sustain attention on anything that doesn't immediately interest him. His desk is perpetually chaotic.",
        "Symptoms have been present since kindergarten. His IQ is average, vision and hearing are normal, and his pediatrician finds no medical explanation.",
        "Six or more inattentive symptoms and six or more hyperactive-impulsive symptoms, present across at least two settings (home and school) since before age 12, causing clear academic and social impairment."
      ],
      teach:"ADHD, Combined Presentation requires ≥6 symptoms in both the inattentive and hyperactive-impulsive clusters. Cross-setting presence (home and school) and onset before age 12 are essential criteria, not optional features."
    },
    {
      id:"easy-agoraphobia", date:"2026-07-09", answer:"Agoraphobia",
      accept:["agoraphobia"],
      clues:[
        "A 35-year-old comes in describing months of near-housebound living. 'I feel safer at home,' they say quietly, without volunteering how restricted their world has become.",
        "They haven't used public transit in six months. Getting to the grocery store requires a family member. Crowded spaces, open plazas, and enclosed venues all feel unbearable.",
        "What they fear isn't a specific object or person — it's the situation itself: being somewhere they can't easily escape or get help if something goes wrong. Bridges, malls, and movie theaters all trigger the same dread.",
        "They've had panic attacks in public before and now organize their entire life around avoiding any place where one might occur and they'd be stranded. The avoidance has grown steadily worse.",
        "Fear and avoidance of at least two situation types — public transit, open spaces, enclosed spaces, crowds, or being outside alone — driven by thoughts that escape or help would be unavailable. Lasting over 6 months with significant impairment. Good insight."
      ],
      teach:"Agoraphobia in DSM-5 is a standalone diagnosis, not simply a complication of Panic Disorder. The defining feature is fear across at least two agoraphobic situation types, driven by escape-or-help concerns. Many clients with agoraphobia have never had a full panic attack."
    },
    {
      id:"easy-ocd-washing", date:"2026-07-10", answer:"Obsessive-Compulsive Disorder",
      accept:["obsessive compulsive disorder","obsessive-compulsive disorder","ocd","obsessive compulsive"],
      clues:[
        "A 28-year-old comes in reluctantly. Their hands are cracked and bleeding — they wash over 30 times a day and have tried to stop on their own without success.",
        "The washing follows contact with anything they consider contaminated: doorknobs, shared surfaces, strangers' hands, a library book. They know others wouldn't see these items as dangerous.",
        "Not washing feels intolerable — as though something terrible will happen to them or someone they love. The relief after washing lasts only minutes before the urge returns.",
        "The rituals follow strict rules: a set number of sequences in a specific order. Losing count requires starting over. They've started avoiding the office bathroom to escape situations that would trigger the sequence.",
        "Recurrent contamination obsessions relieved only by compulsive washing rituals — recognized as excessive, governed by rigid rules, consuming more than an hour daily, causing significant distress and occupational impairment. Good insight."
      ],
      teach:"The most widely recognized OCD presentation. Egodystonic obsessions (intrusive and recognized as excessive) plus compulsions that temporarily neutralize anxiety but reinforce the cycle long-term. The rituals follow internal rules — they're not random repetition — and provide only brief relief."
    },
    {
      id:"easy-schizophrenia", date:"2026-07-11", answer:"Schizophrenia",
      accept:["schizophrenia"],
      clues:[
        "A 24-year-old is brought in by his parents, who say he has 'changed completely' over the past year. He dropped out of college, stopped bathing, and barely leaves his room.",
        "He's convinced a secret organization is monitoring him through his laptop camera. He's taped over every camera and mirror in his apartment and won't answer the door.",
        "He hears two voices arguing with each other about his actions — clearly external to his own thoughts, distressing, and interrupting his ability to concentrate.",
        "His thinking is disorganized: he shifts topics mid-sentence, leaves thoughts unfinished, and answers questions with loosely connected tangents. His affect is flat and expressivity minimal.",
        "Delusions, auditory hallucinations, and disorganized thinking have been continuously present for over a year. He's quit his job, eats irregularly, and barely bathes. No prior mood episodes, no substance use, normal medical workup."
      ],
      teach:"Schizophrenia requires two or more active-phase symptoms for ≥1 month plus continuous signs of disturbance for ≥6 months. Negative symptoms (flat affect, avolition, alogia, anhedonia) and functional decline are as diagnostically important as hallucinations and delusions."
    },
    {
      id:"easy-conduct", date:"2026-07-12", answer:"Conduct Disorder",
      accept:["conduct disorder"],
      clues:[
        "A 14-year-old is brought in on a court order following his second shoplifting arrest. The juvenile officer notes the arrests are only the most visible part of a longer pattern.",
        "In the past year he's been suspended three times for fighting, broken into a neighbor's shed, and been deliberately cruel to a neighborhood animal. His parents say the pattern has escalated since age 11.",
        "He expresses no remorse. Asked how the neighbor felt about the shed, he shrugs: 'Not my problem.' He consistently minimizes harm to others and reassigns blame.",
        "The family has stable housing and no documented history of abuse. His younger sibling has no conduct concerns. He's acted this way across school, home, and the community.",
        "A repetitive, persistent pattern of behavior violating others' rights or major social norms — including aggression, property destruction, deceitfulness, and serious rule violations — present across settings for over 12 months, with at least one criterion in the past 6 months. Limited insight."
      ],
      teach:"Conduct Disorder requires 3 or more criteria across four groups (aggression, property destruction, deceitfulness, serious rule violations) in the past 12 months, with at least one in the last 6 months. The callous-unemotional specifier (limited prosocial emotions) carries significant prognostic weight."
    },
    {
      id:"easy-anorexia-bep", date:"2026-07-13", answer:"Anorexia Nervosa, Binge-Eating/Purging Type",
      accept:["anorexia nervosa binge-eating purging type","anorexia nervosa, binge-eating/purging type","anorexia nervosa binge eating purging type","anorexia nervosa","anorexia"],
      clues:[
        "A 19-year-old is referred by her college roommate after she was found purging in the bathroom after meals. The client is visibly underweight — the roommate estimates she hasn't gained weight since high school.",
        "She restricts intake severely but says her eating has been 'out of control lately.' Sometimes she eats large amounts after starving, then purges. 'The purging keeps me safe,' she says.",
        "Her BMI is significantly low. She has fine lanugo on her arms. She says she still has 'areas to work on' and denies being underweight, despite visible emaciation.",
        "Her purging threshold is very low — she purges after eating amounts others would consider small. Her self-worth is entirely organized around body weight and shape.",
        "Restriction of food intake resulting in significantly low body weight, intense fear of weight gain, and disturbed body image — with recurrent binge-eating or purging behavior in the past three months. Insight is absent: she denies the medical seriousness of her current weight."
      ],
      teach:"The binge-eating/purging type of anorexia is distinguished from bulimia nervosa by significantly low body weight — the defining distinction. Both types share intense fear of weight gain and body image disturbance. Medical risk is high: electrolyte disturbances, cardiac arrhythmia, and bone density loss."
    },
    {
      id:"easy-cannabis", date:"2026-07-14", answer:"Cannabis Use Disorder",
      accept:["cannabis use disorder"],
      clues:[
        "A 23-year-old comes in at a parent's insistence. 'I just smoke to chill — it's not a problem.' They use daily, starting in the afternoon and smoking until bed.",
        "They've tried to stop or cut back three or four times in the past year. Each attempt lasted about a week before irritability, restlessness, and insomnia drove them back.",
        "They've started showing up late to their afternoon work shift after losing track of time, and have called in sick twice after forgetting they had a shift.",
        "They've withdrawn from friends who don't smoke and spend most free time obtaining, using, or recovering from use. Without cannabis they feel anxious and can't sleep — they describe it as 'just feeling normal.'",
        "A pattern of cannabis use causing significant impairment over 12 months: failed attempts to cut back, tolerance, withdrawal on abstinence, using more than intended, and continued use despite work and social consequences. Insight is limited."
      ],
      teach:"Cannabis Use Disorder requires 2 or more of 11 criteria within 12 months. Withdrawal (irritability, insomnia, anxiety, decreased appetite) is an official DSM-5 criterion. A common presenting pattern: clients use to manage baseline anxiety that the drug is actually sustaining through withdrawal cycles."
    },
    {
      id:"easy-gambling", date:"2026-07-15", answer:"Gambling Disorder",
      accept:["gambling disorder"],
      clues:[
        "A 41-year-old comes in at a spouse's ultimatum. They've gambled since their twenties, mostly at casinos. The past two years have escalated sharply.",
        "They've lost $60,000 and borrowed heavily from family without explaining what the money was for. They took a second job not to save, but to fund continued gambling.",
        "They need to bet increasing amounts to achieve the same excitement. When they try to stop they become irritable, restless, and unable to concentrate. They've told their spouse five times they've quit — and meant it each time.",
        "After big losses they return the next day to 'win it back.' Their partner has found casino receipts hidden in the car on three separate occasions.",
        "Persistent, recurrent gambling despite harm: preoccupation with gambling, needing increasing amounts, failed efforts to stop, irritability when cutting back, chasing losses, lying to family, and jeopardizing relationships — four or more criteria over 12 months. Limited insight."
      ],
      teach:"Gambling Disorder is the only behavioral addiction formally recognized in DSM-5, classified alongside substance-related disorders. The 'chasing' pattern — returning to win back losses — is a particularly strong diagnostic indicator. Denial and minimization parallel patterns in substance use disorders."
    },
    {
      id:"easy-tourettes", date:"2026-07-16", answer:"Tourette's Disorder",
      accept:["tourette s disorder","tourette's disorder","tourettes disorder","tourettes","tourette disorder","tourette syndrome","tourette's syndrome"],
      clues:[
        "An 11-year-old boy is referred after teachers report disruptive eye-rolling, head-jerking, and throat-clearing he cannot control. He's been teased by classmates and is visibly embarrassed.",
        "The movements are sudden, repetitive, and non-rhythmic — distinct from normal fidgeting. His parents noticed similar but milder movements two years ago that gradually shifted: eye-blinking gave way to shoulder-shrugging before the current pattern.",
        "There's also an involuntary sniff-grunt he makes intermittently. He can briefly suppress it, but only at the cost of a mounting pressure that becomes almost intolerable — like holding a sneeze. It always comes out eventually.",
        "Neurological exam is otherwise normal. No medical explanation has been found. Tics in some form have been present for over a year with no tic-free period longer than three months.",
        "Multiple motor tics and at least one vocal tic — present at some point during the illness, though not necessarily simultaneously — first appearing before age 18, lasting more than a year, not attributable to substances or another medical condition."
      ],
      teach:"Tourette's requires both multiple motor tics and at least one vocal tic, lasting more than one year (though tic type, frequency, and location can shift over time). Tics are typically preceded by a premonitory sensory urge and can be transiently suppressed — at the cost of mounting discomfort that demands eventual release."
    }
  ],
  medium: [
    {
      id:"med-bipolar2", date:"2026-06-28", answer:"Bipolar II Disorder",
      accept:["bipolar ii","bipolar 2","bipolar two","bipolar ii disorder","bipolar 2 disorder"],
      clues:[
        "A 27-year-old comes in seeking help for recurring depression that they say \"antidepressants never quite fix.\"",
        "They report several depressive episodes over the past few years — low mood, fatigue, hopelessness, and trouble getting through the workday.",
        "Asked about their better stretches, they mention occasional periods of feeling unusually energized, needing little sleep yet feeling rested, and being very productive — \"just my good weeks.\"",
        "During those stretches others noticed they were more talkative and started lots of projects. They were never hospitalized and kept functioning.",
        "These elevated periods last about 4–5 days and are a clear change from their usual self, but cause no marked impairment and no psychotic features.",
        "Pattern: at least one hypomanic episode plus at least one major depressive episode, and never a full manic episode. Insight is okay — they tend to minimize the \"up\" periods as just feeling good."
      ],
      teach:"Frequently misdiagnosed as unipolar depression because clients rarely report hypomania as a problem. Hallmark: hypomania + MDE, no full mania."
    },
    {
      id:"med-ocd", date:"2026-06-27", answer:"Obsessive-Compulsive Disorder",
      accept:["obsessive compulsive disorder","obsessive-compulsive disorder","ocd","obsessive compulsive"],
      clues:[
        "A 24-year-old reluctantly discloses \"horrible thoughts\" they're terrified to say out loud, and seems deeply ashamed.",
        "They describe intrusive, unwanted images of harming people they love — thoughts that horrify them and feel completely against their values.",
        "There is no cleanliness or hand-washing theme at all. Instead they perform silent mental rituals — repeating phrases, praying, mentally \"reviewing\" — to neutralize the thoughts.",
        "They've begun avoiding being alone with loved ones and hiding kitchen knives, and the rituals now eat well over an hour a day.",
        "They recognize the thoughts are products of their own mind and don't want to act on them; the urge is to relieve unbearable anxiety, not a wish to do harm.",
        "Obsessions (egodystonic intrusive thoughts) plus compulsions (covert mental acts) that are time-consuming and impairing. Insight is good-to-okay — they fear they're \"a monster,\" a common but mistaken self-appraisal in this disorder."
      ],
      teach:"A subtle, often-missed presentation: harm/taboo obsessions with purely mental compulsions and no overt washing/checking. Egodystonic content distinguishes it from genuine intent."
    },
    {
      id:"med-bulimia", date:"2026-06-26", answer:"Bulimia Nervosa",
      accept:["bulimia nervosa","bulimia"],
      clues:[
        "A 22-year-old college student presents with fatigue, tooth sensitivity, and irregular periods, and mentions feeling \"out of control around food.\"",
        "They describe recurrent episodes of eating unusually large amounts in a short time, with a sense that they can't stop once they start.",
        "Afterward they feel intense guilt and compensate — self-induced vomiting, with occasional over-exercising or laxative use.",
        "Their body weight sits in the normal range, which is part of why no one has noticed; their self-worth is heavily tied to body shape and weight.",
        "Exam reveals eroded dental enamel and small calluses on the knuckles, and labs show mildly low potassium.",
        "Binges plus inappropriate compensatory behaviors, on average at least weekly for three months, with self-evaluation unduly influenced by shape/weight — and not occurring exclusively during anorexia. Insight is okay; shame drives concealment."
      ],
      teach:"Unlike anorexia, weight is typically normal, masking the disorder. Physical tells: enamel erosion, knuckle calluses (Russell's sign), and electrolyte disturbance."
    },
    {
      id:"med-pdd", date:"2026-06-25", answer:"Persistent Depressive Disorder",
      accept:["persistent depressive disorder","dysthymia","persistent depressive disorder dysthymia","pdd","chronic depression"],
      clues:[
        "A 35-year-old comes in saying they've \"just always been this way\" — low mood, low energy, low self-esteem — \"for as long as I can remember, honestly.\"",
        "They describe functioning but feeling empty. They get through the workday but take no real satisfaction from anything. Weekends don't help; they just feel flat.",
        "They've tried two antidepressants in the past without much benefit. They don't recall a stretch in the past several years when they felt consistently okay for more than a couple of weeks.",
        "Low energy, poor concentration, feelings of hopelessness, mildly disrupted sleep — but on careful review they haven't met full MDD criteria at any given moment. No history of mania or hypomania.",
        "Depressed mood more days than not for at least two years, with at least two additional depressive symptoms, never free of symptoms for more than two months at a stretch. Good insight — they just frame it as \"who I am.\""
      ],
      teach:"Often called 'double depression' when an MDE occurs on top of PDD. Key differentiator from MDD: chronicity (≥2 years), not symptom severity. Clients often experience their depression as a personality trait rather than a treatable illness."
    },
    {
      id:"med-bpd", date:"2026-06-24", answer:"Borderline Personality Disorder",
      accept:["borderline personality disorder","bpd","borderline personality disorder bpd","borderline"],
      clues:[
        "A 26-year-old comes in following a breakup they describe as \"the worst thing that's ever happened to me\" — the third time in a year they've presented in crisis over a relationship ending.",
        "They describe relationships that start with intensity — \"I've never felt so understood, it was perfect\" — and collapse suddenly into rage or despair when the other person disappoints them.",
        "When relationships end they feel empty and \"like I don't exist.\" They've cut themselves on several occasions to \"feel something\" or relieve unbearable emotional pain.",
        "Their sense of self shifts dramatically depending on who they're with. They've changed career paths twice and adopted and dropped different identities over the past two years.",
        "A pervasive pattern of unstable relationships, identity disturbance, and affect dysregulation, with impulsivity: frantic efforts to avoid abandonment, unstable intense relationships, self-harm, chronic emptiness, and reactive mood. At least 5 of 9 criteria, present since early adulthood. Okay insight."
      ],
      teach:"BPD is frequently misdiagnosed as bipolar disorder. The key difference: mood shifts in BPD are reactive to interpersonal events (minutes to hours), not sustained episodes. Identity disturbance and abandonment sensitivity are defining features."
    },
    {
      id:"med-avpd", date:"2026-06-23", answer:"Avoidant Personality Disorder",
      accept:["avoidant personality disorder","avpd","avoidant personality","avoidant personality disorder avpd"],
      clues:[
        "A 33-year-old seeks therapy saying they're \"too shy and weird to have a real life.\" They've never had a romantic relationship and have only one friend, whom they've known since childhood.",
        "They desperately want close relationships but believe others will find them boring or fundamentally flawed once they get to know them. They hold back in conversations to avoid saying something embarrassing.",
        "They've turned down two promotions because the roles would require presenting to groups. They eat lunch alone every day and have declined every social invitation from coworkers for years.",
        "Unlike someone content with solitude, this client is in ongoing pain — they yearn for connection but feel certain rejection is inevitable the moment they let people in.",
        "A pervasive pattern (since early adulthood) of social inhibition, feelings of inadequacy, and hypersensitivity to negative evaluation — avoiding occupational activities with interpersonal contact, restraint in relationships for fear of ridicule, viewing themselves as inferior. At least 4 of 7 criteria. Limited insight."
      ],
      teach:"Avoidant PD and Social Anxiety Disorder overlap heavily, but AvPD reflects a pervasive self-concept of fundamental inadequacy — not just situational fear. Clients want connection intensely; that yearning distinguishes them from schizoid presentation."
    },
    {
      id:"med-hoarding", date:"2026-06-22", answer:"Hoarding Disorder",
      accept:["hoarding disorder","hoarding","compulsive hoarding"],
      clues:[
        "A 58-year-old is referred by their adult children, who discovered the state of the apartment during a health scare. The client came reluctantly and minimizes the concern.",
        "Every room except the bathroom is packed floor-to-ceiling with newspapers, boxes, and miscellaneous objects — the kitchen and living room are functionally inaccessible.",
        "The client becomes distressed when asked about discarding anything and can articulate a reason to keep every object. The thought of throwing away a ten-year-old magazine causes genuine anxiety.",
        "They deny it's a problem: \"I know where everything is.\" But they haven't had guests in twelve years and their children report food safety concerns and fire hazards.",
        "Persistent difficulty discarding possessions regardless of actual value, driven by perceived need to save them and distress when discarding, resulting in clutter that compromises the living space. Limited insight — they don't experience the hoarding as a problem."
      ],
      teach:"Hoarding disorder is distinct from OCD: the relationship to possessions is ego-syntonic (the client sees value in keeping, not a senseless compulsion to resist). Insight ranges from good to absent — limited or absent insight is common and affects treatment."
    },
    {
      id:"med-somatic", date:"2026-06-21", answer:"Somatic Symptom Disorder",
      accept:["somatic symptom disorder","ssd","somatic symptom disorder ssd","somatic symptom"],
      clues:[
        "A 44-year-old has seen seven specialists over three years for persistent, severe abdominal pain and fatigue. Extensive workup — endoscopy, imaging, bloodwork — has been consistently normal.",
        "They check their symptoms online daily, keep a detailed pain diary, and bring thick folders of medical records to every appointment. They're convinced something serious is being missed.",
        "They've quit their job because of the pain, and family life has organized around managing their symptoms. Health is their primary topic of conversation.",
        "They're not fabricating — the pain is real and distressing. But reassurance from physicians provides only brief relief before the worry returns, and their response to health information is disproportionate.",
        "One or more distressing somatic symptoms plus excessive thoughts, feelings, or behaviors: disproportionate worry, persistently high health anxiety, or excessive time devoted to symptoms — lasting more than 6 months. Insight is limited — they believe a physical cause is being missed."
      ],
      teach:"SSD does not require medically unexplained symptoms — someone with a confirmed diagnosis (e.g., IBS) can still qualify if their psychological response is disproportionate. The diagnosis lives in the quality of the response, not the absence of a medical finding."
    },
    {
      id:"med-bed", date:"2026-06-20", answer:"Binge-Eating Disorder",
      accept:["binge-eating disorder","binge eating disorder","bed","binge eating disorder bed","binge eating"],
      clues:[
        "A 38-year-old comes in wanting to \"get control of my eating.\" They've been on and off diets for twenty years and feel disgusted with themselves.",
        "They describe episodes — roughly twice a week — of eating a very large amount in under two hours, always in secret: finishing a full pizza, a pint of ice cream, and a bag of chips in one sitting.",
        "During these episodes they feel unable to stop, eat much faster than usual, and continue well past fullness. Afterward they feel intensely ashamed and depressed.",
        "Critically, there is no compensatory behavior — no purging, excessive exercise, or fasting. They attribute their weight to \"no willpower,\" which is not the correct frame.",
        "Recurrent binge episodes (at least once weekly for 3 months) marked by loss of control and significant distress — without the compensatory behaviors that define bulimia. Insight is okay; shame prevents disclosure."
      ],
      teach:"BED is the most common eating disorder and frequently missed in primary care. Key distinction from bulimia: no compensatory behaviors. The core pathology is loss of control and distress, not simply eating a large amount."
    },
    {
      id:"med-npd", date:"2026-06-19", answer:"Narcissistic Personality Disorder",
      accept:["narcissistic personality disorder","npd","narcissistic personality disorder npd","narcissistic personality"],
      clues:[
        "A 42-year-old attorney comes in at the suggestion of their second wife, who says they have \"no empathy.\" The client agrees to come only after framing therapy as a way to address \"people who don't appreciate them.\"",
        "They describe colleagues as incompetent and subordinates as lucky to work for them. They're furious about being passed over for partnership — \"obviously political; the committee is threatened by me.\"",
        "They expect special treatment from staff, expect deference in relationships, and become coldly contemptuous when slighted. They've ended friendships abruptly when people \"stopped showing up\" for them.",
        "Exploring relationships reveals they struggle to recognize others' feelings unless those others are serving a function for them. Their wife's complaints about loneliness are genuinely baffling to them.",
        "A pervasive pattern (since early adulthood): grandiose self-importance, preoccupation with success and power, sense of entitlement, interpersonally exploitative, lack of empathy, envy, and arrogance. At least 5 of 9 criteria. Limited insight."
      ],
      teach:"NPD often surfaces in therapy when external events challenge the grandiose self-image (a career setback, a leaving spouse). True empathy deficit — not just self-centeredness — is a core diagnostic feature, not a value judgment."
    },
    {
      id:"med-ptsd-dissoc", date:"2026-06-18", answer:"Post-Traumatic Stress Disorder, With Dissociative Symptoms",
      accept:["post-traumatic stress disorder with dissociative symptoms","ptsd with dissociative symptoms","ptsd dissociative subtype","ptsd, with dissociative symptoms","ptsd dissociative","ptsd with dissociation"],
      clues:[
        "A 31-year-old survivor of childhood abuse describes flashbacks that go beyond re-experiencing — during episodes, they feel completely detached from their own body, like watching themselves from across the room.",
        "Throughout the day they experience periods of feeling unreal, as if they're in a dream. Long stretches of time sometimes pass with no clear memory of what happened.",
        "They meet full PTSD criteria: intrusive memories, nightmares, avoidance, negative mood changes, and hyperarousal — present for years following prolonged early-life trauma.",
        "The depersonalization and derealization are not explained by substances, a medical condition, or another dissociative disorder. They emerge around trauma reminders but also occur without obvious trigger.",
        "Full PTSD criteria plus persistent or recurrent depersonalization (detachment from one's mental processes or body) or derealization (sense of unreality of surroundings). Insight is okay — they understand the connection to their history."
      ],
      teach:"The dissociative subtype of PTSD is associated with high burden of early/chronic trauma and emotional overmodulation (vs. undermodulation in classic PTSD). Standard prolonged exposure may need modification — dissociation can interfere with processing."
    },
    {
      id:"med-schizoaffective", date:"2026-06-17", answer:"Schizoaffective Disorder",
      accept:["schizoaffective disorder","schizoaffective","schizoaffective disorder bipolar type","schizoaffective disorder depressive type"],
      clues:[
        "A 29-year-old is brought in by their roommate after a week of not sleeping, apparent conversations with people who aren't there, and urgent notes about being monitored by the government.",
        "On exam they're expansive, speak rapidly, and describe a special mission only they can perceive. They report hearing voices that comment on their actions and confirm their importance.",
        "After two weeks of antipsychotics, the elevated mood and pressured speech resolve — but the voices and persecutory beliefs persist for several more weeks in the absence of prominent mood symptoms.",
        "Chart review shows two prior episodes: once a depressive episode with mood-congruent delusions, and once a manic-like episode. Between episodes they function marginally with residual odd thinking.",
        "An uninterrupted period includes both a major mood episode and core psychotic symptoms. Crucially, delusions or hallucinations were present for at least two weeks without prominent mood symptoms — this is the key distinction. Insight is very limited."
      ],
      teach:"The critical differentiator: psychotic symptoms persist for ≥2 weeks independent of mood episodes. In mood disorder with psychotic features, psychosis appears only during mood episodes. Schizoaffective sits on the spectrum between schizophrenia and mood disorders."
    },
    {
      id:"med-asd", date:"2026-06-16", answer:"Acute Stress Disorder",
      accept:["acute stress disorder","asd acute stress","acute stress"],
      clues:[
        "A 25-year-old comes in five days after a serious car accident in which they witnessed a passenger badly injured. \"I can't stop seeing it. I feel like I'm going crazy.\"",
        "They describe intrusive images of the crash forcing themselves into awareness, a sense of reliving it when they close their eyes, and feeling detached from their own body since it happened.",
        "They've been unable to drive, avoid any roads or news coverage about accidents, can't sleep, and have had two panic responses to sudden loud noises at work.",
        "They know what they're experiencing is a response to the trauma — insight is intact — but the symptoms feel uncontrollable. It's been five days and the intensity hasn't diminished.",
        "Following a traumatic event: at least 9 of 14 symptoms across intrusion, negative mood, dissociation, avoidance, and arousal clusters — lasting between 3 days and 1 month, with significant distress or impairment."
      ],
      teach:"Acute Stress Disorder is the diagnosis for the first month post-trauma (3 days–1 month). Dissociative symptoms feature more prominently in ASD than in PTSD criteria. ASD may or may not progress to PTSD — it's not a guaranteed precursor."
    },
    {
      id:"med-mdd-psychotic", date:"2026-07-07", answer:"Major Depressive Disorder, With Psychotic Features",
      accept:["major depressive disorder with psychotic features","major depressive disorder, with psychotic features","mdd with psychotic features","psychotic depression"],
      clues:[
        "A 55-year-old is brought in by their adult children after two months of worsening depression. They've stopped eating, won't leave their room, and say repeatedly that 'it's over.'",
        "They're convinced they have cancer — despite a completely normal workup including MRI and an oncology consultation last week. The belief cannot be shaken by the results.",
        "They also believe they've caused financial ruin that will destroy their family, despite bank records showing adequate savings. They're certain the records are wrong.",
        "The beliefs are mood-congruent: failure, illness, and ruin. There is no history of psychotic symptoms outside of depressive episodes, and no history of mania.",
        "The delusions emerged during this episode and, as far as the history suggests, have never occurred independently of a mood episode.",
        "Full MDE criteria plus mood-congruent delusions of somatic disease and financial ruin — not explained by schizoaffective disorder or occurring exclusively during a primary psychotic illness. Insight is absent: the client is certain the beliefs are simply true."
      ],
      teach:"The psychotic features specifier applies when delusions or hallucinations occur during a MDE. Mood-congruent content (failure, guilt, ruin, somatic disease) is typical. Critical distinction from schizoaffective disorder: in MDD with psychotic features, the psychosis does not persist after the mood episode resolves."
    },
    {
      id:"med-ocpd", date:"2026-07-08", answer:"Obsessive-Compulsive Personality Disorder",
      accept:["obsessive compulsive personality disorder","obsessive-compulsive personality disorder","ocpd","obsessive compulsive personality disorder ocpd"],
      clues:[
        "A 47-year-old accountant enters therapy because their spouse has threatened to leave over 'controlling behavior.' The client comes reluctantly and frames the appointment as a chance to explain what the spouse isn't understanding.",
        "Home life runs on schedules and rules they've established for efficiency. Deviations cause genuine distress — a dish left in the sink, laundry started at the wrong time, a change to the dinner plan.",
        "At work they're technically excellent but have missed two deadlines because they couldn't submit anything less than perfect. They've redone reports multiple times rather than accept a 'good enough' version.",
        "They've delegated tasks to their children and then quietly redone each one. They keep appliances they no longer use because discarding them feels wasteful. Vacations haven't happened in six years.",
        "Their moral standards are rigid — they become genuinely upset when others cut small ethical corners. Work comes before leisure or relationships, and they don't see anything wrong with that ordering.",
        "A pervasive pattern of preoccupation with orderliness, perfectionism, and control at the expense of flexibility and efficiency: rigid rules, perfectionism interfering with task completion, excessive devotion to work, inflexibility about ethics, inability to delegate, and difficulty discarding worthless objects. At least 4 of 8 criteria since early adulthood. Insight is limited — the standards feel correct, not excessive."
      ],
      teach:"OCPD is ego-syntonic: the client experiences the rigidity as justified and correct, in contrast to OCD's egodystonic obsessions. The clinically important distinction: OCPD's rigidity impairs flexibility and relationships; OCD's obsessions are experienced as intrusive and unwanted. Both can coexist."
    },
    {
      id:"med-paranoid-pd", date:"2026-07-09", answer:"Paranoid Personality Disorder",
      accept:["paranoid personality disorder","paranoid personality"],
      clues:[
        "A 44-year-old comes in at an employer EAP's insistence after filing a complaint alleging that a coworker sabotaged their performance review. They're reluctant and scanning the room as they speak.",
        "They describe a pattern going back decades: colleagues who 'play nice to your face,' friends who eventually 'showed their true colors,' family members cut off after perceived betrayals — each described as the other person's fault.",
        "They keep detailed logs of workplace slights — saved emails, noted glances. They've consulted a lawyer twice in the past year about potential wrongful conduct by colleagues, both times without actionable findings.",
        "Their partner reports being questioned about fidelity regularly despite no evidence of infidelity. The client explains: 'Everyone cheats if they think they can get away with it.' They present this as realism, not jealousy.",
        "They acknowledge difficulty trusting others but insist this is rational and earned: 'I've been proven right before.' The pattern predates any single betrayal and spans every major relationship in their life.",
        "A pervasive pattern of suspiciousness and distrust such that others' motives are interpreted as malevolent: unjustified suspicions of exploitation, preoccupation with doubts about loyalty, reluctance to confide, reading benign remarks as threatening, persistent grudges, and unfounded suspicions about partner fidelity. At least 4 of 7 criteria since early adulthood. Insight is limited — the suspicion feels like accurate perception."
      ],
      teach:"Paranoid PD involves pervasive suspiciousness as a stable personality trait, not discrete delusions — this distinguishes it from delusional disorder. Distinguish from schizotypal PD (which adds magical thinking and perceptual distortions) and from PTSD-related hypervigilance (which is contextually linked to trauma). Limited insight is the rule and the main treatment barrier."
    },
    {
      id:"med-ied", date:"2026-07-10", answer:"Intermittent Explosive Disorder",
      accept:["intermittent explosive disorder","intermittent explosive disorder ied","ied","ied anger"],
      clues:[
        "A 32-year-old is referred after a road-rage incident resulted in a police report. Their partner describes similar episodes at home: sudden intense outbursts over trivial frustrations, followed by rapid return to baseline.",
        "The triggers are consistently minor: a driver who cuts them off, a dish left in the sink, a comment at work that felt dismissive. The response — yelling, throwing an object, punching a wall — is grossly out of proportion.",
        "Between episodes their mood is unremarkable — no depression, no sustained anxiety, no mania. The explosions are episodic and discrete, not a continuous undercurrent of irritability.",
        "After each episode they feel genuine remorse and embarrassment. They describe the anger as building rapidly — 'something takes over' — and then dissipating quickly after the outburst.",
        "They deny wanting to hurt anyone and have never been physically violent toward a person. The episodes are distressing to them and are damaging their relationship.",
        "Recurrent outbursts representing failure to control aggressive impulses — verbal or behavioral aggression at least twice weekly for 3 months, or 3 behavioral outbursts in 12 months — with outburst magnitude grossly out of proportion to any provocation, not better explained by another disorder, substance use, or a medical condition."
      ],
      teach:"IED is defined by rapid-onset explosive outbursts grossly disproportionate to triggers, with quick resolution back to normal mood. Rule out: bipolar disorder (sustained mood changes between episodes), BPD (reactivity tied to interpersonal abandonment), and substance intoxication. The remorse after outbursts is diagnostically characteristic."
    },
    {
      id:"med-did", date:"2026-07-11", answer:"Dissociative Identity Disorder",
      accept:["dissociative identity disorder","did","dissociative identity disorder did","multiple personality disorder"],
      clues:[
        "A 28-year-old comes in saying they've been 'losing time.' They find notes they don't remember writing, have been greeted by strangers using a name that isn't theirs, and once found themselves two hours from home with no memory of getting there.",
        "Their partner describes periods when they seem like 'a completely different person' — different voice, different name, different mannerisms. The client has no recall of these periods.",
        "They describe internal voices — not external, but inner voices with distinct personalities: one childlike and frightened, another harsh and contemptuous — that sometimes 'take over.'",
        "History: severe, repeated abuse beginning before age 6. Large portions of their childhood are 'blank.' Current safety is established. The presentation is chronic, not acute.",
        "The clinician notices that affect, vocabulary, and biographical details shift unexpectedly during the same interview. The switching is not explained by substances or a medical condition.",
        "Disruption of identity characterized by two or more distinct personality states, with recurrent amnesia for everyday events, important personal information, or traumatic events — not part of a broadly accepted cultural practice, causing significant distress or functional impairment."
      ],
      teach:"DID is associated with severe, repeated early trauma, typically before age 9. The internal 'voices' differ from schizophrenic hallucinations — they are experienced as internal and identity-based, not as external. Amnesia is a core feature: many clients present with unexplained time loss rather than awareness of distinct alter states."
    },
    {
      id:"med-gender-dysphoria", date:"2026-07-12", answer:"Gender Dysphoria",
      accept:["gender dysphoria"],
      clues:[
        "A 17-year-old is referred by their parents after disclosing they've felt 'wrong' in their body since around age 9. They've asked to use a different name and pronouns at home.",
        "They describe a persistent, intense incongruence between their assigned sex at birth and their experienced gender. 'I have always felt like a girl inside,' they say. 'This isn't new or sudden.'",
        "They express significant distress about pubertal changes that don't match their sense of self, and have researched gender-affirming medical options independently.",
        "Their gender identity is clear and consistent — they are not confused about who they are. The distress is about the mismatch between their body and their inner experience, not about the identity itself.",
        "At school they have friends and adequate grades. The distress has intensified as puberty continues and the home environment remains unsupportive.",
        "Marked incongruence between experienced or expressed gender and assigned gender — with significant distress or impairment — persisting for at least 6 months. The diagnosis captures the distress of incongruence and supports access to care; the identity itself is not the disorder."
      ],
      teach:"DSM-5 frames Gender Dysphoria as the distress arising from gender incongruence, not the identity itself. The diagnosis supports access to gender-affirming care. Distinguish from body dysmorphic disorder (concern is about specific features, not holistic gender identity) and from normative gender non-conformity that causes no significant distress."
    },
    {
      id:"med-delusional", date:"2026-07-13", answer:"Delusional Disorder",
      accept:["delusional disorder"],
      clues:[
        "A 52-year-old is brought in by their sister after a months-long escalation of a dispute with their neighbor. The client is calm, articulate, and completely certain the neighbor is systematically poisoning their property.",
        "They've hired a private investigator, installed cameras, sent two certified letters to the city, and brought bagged soil samples to the appointment. When samples came back clean, they concluded the test 'wasn't sensitive enough.'",
        "On interview, cognition is intact and speech is organized and coherent. They discuss work, family, and other matters normally. The belief about the neighbor doesn't spill into other domains of thinking.",
        "No history of schizophrenia. No hallucinations. No mania. Functioning outside the delusional domain is largely preserved — they work, maintain relationships, and manage daily tasks.",
        "The belief has been fixed and unwavering for seven months. Every ambiguous event is incorporated as further confirmation. The neighbor's denial is itself taken as evidence of culpability.",
        "One or more delusions lasting at least one month — with overall functioning not markedly impaired beyond the delusion's impact, without prominent hallucinations, and without the other active-phase symptoms of schizophrenia. Insight is absent."
      ],
      teach:"Delusional disorder is distinguished from schizophrenia by the absence of other active-phase symptoms and the relative preservation of overall functioning. The delusion is circumscribed. Persecutory type is most common. The belief is unshakeable and the client rarely seeks — or accepts — psychiatric treatment."
    },
    {
      id:"med-dependent-pd", date:"2026-07-14", answer:"Dependent Personality Disorder",
      accept:["dependent personality disorder","dependent personality"],
      clues:[
        "A 36-year-old comes in the week after a five-year relationship ended. 'I don't know how to be alone,' they say. They moved back to their parents' home that same week. They have never lived independently.",
        "During the relationship they let their partner make virtually all decisions: where to live, which jobs to consider, which invitations to accept. They consistently abandoned their own preferences to avoid disagreement.",
        "During periods when their partner worked out of town, they became physically ill from anxiety — unable to eat, sleep, or go to work without another person present. No medical cause was found.",
        "They've already begun spending extensive time with a supportive coworker and describe the search for someone to 'take care of things' as urgent.",
        "Looking back, every relationship since adolescence has followed the same arc: immediate intense attachment, wholesale accommodation to the partner's preferences, and inability to function when alone.",
        "A pervasive, excessive need to be taken care of — leading to submissive and clinging behavior: difficulty making everyday decisions without reassurance, needing others to assume responsibility, fear of disagreement, and urgency to find a replacement relationship when one ends. At least 5 of 8 criteria since early adulthood. Limited insight."
      ],
      teach:"Dependent PD is distinguished from separation anxiety (which focuses on fear of harm to attachment figures, not a need for care-taking broadly) and from BPD (where dependency intertwines with abandonment rage and identity instability). The passive accommodation and urgency to replace a relationship when it ends are characteristic features."
    },
    {
      id:"med-histrionic-pd", date:"2026-07-15", answer:"Histrionic Personality Disorder",
      accept:["histrionic personality disorder","histrionic personality"],
      clues:[
        "A 34-year-old comes in following a workplace counseling. They interpreted a routine organizational restructuring as personally directed at them, cried in the break room, and told colleagues 'this place is destroying me.'",
        "In the intake they're warm, engaging, and immediately intimate — sharing personal anecdotes before being asked, describing events in theatrical superlatives: 'the worst thing that's ever happened to anyone.'",
        "They acknowledge feeling uncomfortable when they're not the center of attention, and describe their relational style as naturally flirtatious. They are carefully and strikingly dressed.",
        "Emotional expressions shift rapidly throughout the session — tears, laughter, indignation — in a way that feels somewhat performed. Asked for specific facts, they offer impressions and feelings rather than details.",
        "In relationships they describe intense early connections that others experienced as more casual. They romanticize acquaintances and feel devastated when the closeness they perceived isn't reciprocated.",
        "A pervasive pattern of excessive emotionality and attention-seeking: discomfort when not the center of attention, provocative behavior, rapidly shifting and shallow emotion, using appearance to draw attention, impressionistic vague speech, theatrical expression, suggestibility, and overestimating relationship intimacy. At least 5 of 8 criteria since early adulthood."
      ],
      teach:"Histrionic PD is distinguished from BPD by the absence of identity disturbance, abandonment terror, self-harm, and the intense interpersonal volatility characteristic of BPD. The core feature is attention-seeking and dramatic emotionality as a stable personality pattern. The impressionistic speech style — emotion-heavy, detail-light — is a clinically distinctive marker."
    },
    {
      id:"med-odd", date:"2026-07-16", answer:"Oppositional Defiant Disorder",
      accept:["oppositional defiant disorder","odd","oppositional defiant disorder odd","oppositional defiant"],
      clues:[
        "A 9-year-old girl is referred by her school for 'refusing to cooperate.' She argues back with every instruction, blames classmates for problems she started, and has three detention notices in the past month.",
        "The same pattern plays out at home: she argues with any parental request, loses her temper over minor limits, and deliberately provokes her siblings when told no. Homework is a nightly battle.",
        "These behaviors have persisted across settings for over eight months. Her parents describe her as defiant since around age 6 and say they've exhausted every approach they know.",
        "She has not stolen, destroyed property, or physically harmed anyone. There are no police or legal concerns. The behaviors are argumentative and hostile but don't cross into serious aggression.",
        "A pattern of angry/irritable mood, argumentative/defiant behavior, and vindictiveness — present for at least 6 months in at least one setting, causing distress or impairment — with at least 4 symptoms across the three clusters. Insight is limited.",
        "Ruling out: conduct disorder (no serious aggression, property destruction, or major social norm violations). The behaviors are developmentally inappropriate in frequency and severity and causing impairment at both school and home."
      ],
      teach:"ODD is diagnosed when defiant, hostile behavior meets threshold severity, frequency (norms differ by age), and duration criteria and causes impairment — not simply a description of difficult temperament. The three clusters are: angry/irritable mood, argumentative/defiant behavior, and vindictiveness. Conduct disorder is excluded by the absence of serious violations."
    }
  ],
  hard: [
    {
      id:"hard-adhd", date:"2026-06-28", answer:"Attention-Deficit/Hyperactivity Disorder",
      accept:["adhd","attention deficit hyperactivity disorder","attention-deficit/hyperactivity disorder","attention deficit hyperactivity","add","attention deficit disorder","adhd predominantly inattentive presentation"],
      clues:[
        "A 31-year-old woman is referred after seeking treatment for \"anxiety\" that hasn't responded well to several rounds of therapy.",
        "She feels chronically overwhelmed and behind, and is ashamed she \"can't keep it together\" the way her peers seem to.",
        "She describes a lifelong pattern of losing things, missing deadlines, and difficulty sustaining attention on paperwork — but she's bright and verbal and earned good grades through enormous effort.",
        "She rarely looks outwardly hyperactive. Instead she describes internal restlessness and \"a brain that won't slow down.\" As a child she was called a quiet daydreamer, never a behavior problem.",
        "The inattentive pattern has been present for years across both home and work and clearly predates the anxiety, which looks secondary to years of struggling and self-blame.",
        "She was never flagged for behavioral issues as a child — she was quiet, well-liked, and managed with enormous effort. Presentations like hers routinely slip through diagnostic nets when a child's struggles don't look like a problem to adults.",
        "At least six inattentive symptoms present across home and work since before age 12, causing significant impairment — predating and not better explained by the anxiety that first brought her in. Insight is limited: she attributes her difficulties to character, not to a recognizable and treatable pattern."
      ],
      teach:"A bias-check case: an adult woman with inattentive-type ADHD masked by intelligence and effort, commonly misdiagnosed as anxiety. Onset must predate age 12 and span multiple settings."
    },
    {
      id:"hard-cultural", date:"2026-06-27", answer:"No diagnosis (culturally normative)",
      accept:["no diagnosis","no diagnosis culturally normative","none","no disorder","not a disorder","no mental disorder","culturally normative","normal","healthy","no mental illness"],
      clues:[
        "A 38-year-old recent immigrant is brought in by a worried coworker who says they've been \"talking to spirits.\"",
        "The client calmly describes hearing the voice of a deceased grandparent offering guidance, and occasionally sensing their presence during prayer.",
        "These experiences occur within their religious and cultural practices around ancestor veneration, and are shared and validated by their community.",
        "There is no decline in functioning, no disorganized thinking, no distress about the experiences, and no other psychotic symptoms; they sleep, work, and relate normally.",
        "Family and community members report the same kinds of experiences as expected, meaningful, and reassuring — not alarming.",
        "Check your own assumptions: not every unusual experience constitutes a symptom. The diagnostic framework requires distress or impairment — and the cultural context in which an experience is embedded matters for how it's evaluated.",
        "No impairment, no distress, and experiences fully congruent with the client's religious and cultural community — shared and expected by others in that community — without features of psychotic illness when assessed through a culturally informed lens."
      ],
      teach:"A bias-check case: DSM-5 explicitly excludes culturally sanctioned responses (e.g., hearing a deceased relative's voice in some communities) from being labeled disorders when there is no distress or impairment."
    },
    {
      id:"hard-autism", date:"2026-06-26", answer:"Autism Spectrum Disorder",
      accept:["autism spectrum disorder","autism","asd","autism spectrum","aspergers","asperger s","aspergers syndrome"],
      clues:[
        "A 29-year-old woman seeks help for \"burnout\" and exhaustion after social events, plus long-standing anxiety and depression that treatment only partly helps.",
        "She describes rehearsing conversations in advance, copying others' facial expressions, and feeling like she's \"performing\" to fit in — then collapsing afterward.",
        "She has intense, focused interests, strong sensory sensitivities to noise and clothing textures, and a deep need for routine that she's learned to hide.",
        "As a girl she had one or two close friends and was seen as \"shy but fine\"; she taught herself social scripts that masked her difficulties from teachers.",
        "She struggles to read subtle social cues and with back-and-forth reciprocity, despite superficially smooth social skills built from years of effortful study of others.",
        "Her surface-level social fluency comes at enormous cost — she collapses after interactions, spending hours recovering. The gap between how she appears to others and how she experiences social life is the central clinical feature.",
        "Persistent social-communication deficits plus restricted/repetitive patterns (intense interests, need for routine, sensory sensitivity) present since early development — impairing once social demands outstripped her compensatory strategies. Insight is limited: she's concluded she's simply \"bad at being a person.\""
      ],
      teach:"A bias-check case: camouflaging in women masks autism, which is then mislabeled as anxiety or BPD. Core features (social-communication deficits + restricted/repetitive behaviors) must trace to early development."
    },
    {
      id:"hard-pmdd", date:"2026-06-25", answer:"Premenstrual Dysphoric Disorder",
      accept:["premenstrual dysphoric disorder","pmdd","premenstrual dysphoric disorder pmdd"],
      clues:[
        "A 30-year-old comes in saying her relationships and job are suffering due to \"extreme PMS.\" Her partner says she's \"like a different person\" for about ten days every month.",
        "In the week before her period she experiences marked irritability and emotional lability — snapping at people, then crashing into despair, then feeling crushing shame about it.",
        "She also reports bloating, breast tenderness, feeling overwhelmed and hopeless, and difficulty concentrating. These symptoms disappear completely within a day or two of her period starting.",
        "She has no depressive episodes outside the premenstrual window. A mood chart kept over two cycles confirms the symptoms cluster reliably in the luteal phase and are absent in the follicular phase.",
        "Confirmed by prospective ratings over at least two cycles: ≥5 symptoms in the week before menses including at least one core affective symptom (irritability, lability, dysphoria, anxiety), improving after menses, absent post-menstrually — causing significant impairment. Insight is good.",
        "The client initially resists the diagnosis, worried it \"pathologizes being a woman.\" She needs to understand this is a distinct and treatable disorder, not a character flaw or normal cycle variation.",
        "Ruling in: the strict cyclical timing, confirmed prospectively, with complete remission post-menses, and clear occupational and relationship impairment across multiple cycles. Ruling out: MDD, bipolar, and PMS (which lacks the severity and functional impact)."
      ],
      teach:"PMDD requires prospective confirmation over ≥2 cycles — retrospective recall over-estimates prevalence. Key differentiator from MDD: complete remission after menses, with a symptom-free follicular phase. Effective treatments include SSRIs (even luteal-phase-only dosing) and hormonal therapies."
    },
    {
      id:"hard-dpdr", date:"2026-06-24", answer:"Depersonalization/Derealization Disorder",
      accept:["depersonalization derealization disorder","depersonalization/derealization disorder","dpdr","depersonalization disorder","derealization disorder","depersonalization","derealization"],
      clues:[
        "A 22-year-old comes in saying something is very wrong but struggles to describe it. \"I feel like I'm watching myself from outside my body. Like I'm not real.\"",
        "They describe the world seeming like a movie set — colors slightly off, things looking flat or dreamlike, familiar places feeling unfamiliar. This has been nearly constant for seven months.",
        "They're terrified this means they're \"going crazy\" or have a brain tumor. They've had two ER visits; neurology found nothing. No substance use; full workup is negative.",
        "Crucially, reality testing is intact — they know they are real and the world is real, even as they feel the opposite. This preserved insight rules out psychosis.",
        "When pressed they describe the experience as two-layered: they're functioning, holding conversations, going to class — but feeling as though a glass wall separates them from everything, including their own body.",
        "The symptoms began during a period of high stress and sleep deprivation. They've worsened every time the client focuses on them — a self-perpetuating anxiety loop.",
        "Persistent or recurrent depersonalization or derealization with intact reality testing, causing significant distress or impairment, not attributable to substances, a medical condition, or another mental disorder."
      ],
      teach:"Intact reality testing ('I know I'm real, but I don't feel real') is the essential differentiator from psychosis. DPDR is frequently misidentified as psychosis or a neurological condition. Anxiety about the symptoms typically maintains them — the paradox of trying to feel real makes it worse."
    },
    {
      id:"hard-conversion", date:"2026-06-23", answer:"Conversion Disorder (Functional Neurological Symptom Disorder)",
      accept:["conversion disorder","functional neurological symptom disorder","conversion disorder functional neurological symptom disorder","fnd","functional neurological disorder","conversion"],
      clues:[
        "A 27-year-old presents to neurology with sudden onset of right arm weakness and seizure-like shaking episodes that started three weeks ago. No prior neurological history.",
        "EEG during an episode is normal. Brain MRI and full neurological workup are unremarkable. The shaking doesn't follow expected seizure patterns and stops reliably when attention is diverted.",
        "The arm weakness shows positive clinical signs: Hoover's sign is positive (hip extension normalizes when attention is directed elsewhere), and performance is inconsistent with a fixed neurological lesion.",
        "Significant psychosocial stressors immediately preceded onset — a relationship breakdown and job loss in the same week. The client had a brief episode of unexplained vision loss as a teenager.",
        "Symptoms of altered voluntary motor or sensory function, with clinical evidence that the symptom pattern is internally inconsistent and incompatible with recognized neurological disease. The client is not faking — the symptoms are real and distressing.",
        "The client is upset and feels dismissed: \"Are you saying it's all in my head?\" A careful explanation is needed: the nervous system is producing real symptoms, but through a functional (not structural) mechanism.",
        "Ruling in: positive signs of functional neurological disorder (Hoover's sign, distractibility), normal workup, acute onset in context of stress. Ruling out: malingering (no evident gain) and factitious disorder (symptoms are not intentionally produced)."
      ],
      teach:"FND/Conversion disorder is diagnosed positively via clinical signs — not simply by exclusion. Hoover's sign, distractibility, and tremor entrainment are key. Symptoms are genuine, not feigned (cf. malingering or factitious disorder). Avoid framing as 'psychological' vs. 'real' — the dichotomy is unhelpful and inaccurate."
    },
    {
      id:"hard-cyclothymia", date:"2026-06-22", answer:"Cyclothymic Disorder",
      accept:["cyclothymic disorder","cyclothymia","cyclothymia disorder","cyclothymic"],
      clues:[
        "A 24-year-old describes a pattern stretching back to late adolescence: weeks of feeling energized, sleeping little, and being highly productive, alternating with weeks of low motivation, withdrawal, and mild hopelessness.",
        "In the \"up\" periods they make impulsive decisions and start projects they don't finish. In the \"down\" periods they call in sick and isolate. Neither phase feels like a crisis — they've learned to ride the waves.",
        "They've never had a period longer than two months of stable mood in the past two years. But on careful review they've never fully met criteria for a manic episode, a hypomanic episode, or a major depressive episode.",
        "They're frustrated that prior clinicians didn't take the pattern seriously: \"I'm told I just have 'mood swings' but no one does anything.\" The instability is affecting relationships and work consistency.",
        "The pattern is longstanding and pervasive. Ruling out: bipolar I and II (sub-threshold symptoms on both poles), MDD (sub-threshold depressive periods), ADHD (the cycling is affective, not attentional), and personality disorder.",
        "Consider the clinical significance carefully: sub-threshold doesn't mean sub-impairment. This client has not been symptom-free for more than two months in the past two years.",
        "Numerous periods of hypomanic-like symptoms and depressive-like symptoms over at least 2 years, never meeting full criteria for hypomania, mania, or MDE — present at least half the time, never symptom-free >2 months. Insight is limited — they see it as temperament."
      ],
      teach:"Cyclothymia is frequently dismissed because individual episodes don't meet threshold criteria — but two years of near-continuous sub-threshold cycling carries real impairment and risk of progression to Bipolar I or II. A single MDE or manic episode at any point rules out the diagnosis."
    },
    {
      id:"hard-schizotypal", date:"2026-06-21", answer:"Schizotypal Personality Disorder",
      accept:["schizotypal personality disorder","schizotypal","schizotypal personality"],
      clues:[
        "A 34-year-old is referred by their PCP who noted \"unusual thinking.\" The client came in for anxiety but spent most of the visit describing their sensitivity to others' \"energies\" and a belief that strangers' glances carry personal messages.",
        "They have one or two acquaintances but no close friends, and prefer it this way. Social situations are acutely uncomfortable — they describe feeling like a permanent outsider even among people who seem to like them.",
        "Their speech is tangential and overly metaphorical. They describe practicing thought projection — believing they can influence events with their mind — and they notice meaningful coincidences others miss.",
        "There is no history of frank psychosis, no sustained delusions or hallucinations, though they experience brief perceptual distortions under stress. They are not disconnected from reality.",
        "These patterns have been stable since adolescence. The client isn't troubled by their magical beliefs — those feel accurate to them. The social discomfort and anxiety are what brought them in.",
        "Consider the spectrum carefully: this presentation shares features with schizophrenia (magical thinking, odd speech, ideas of reference, social withdrawal) but lacks sustained psychosis, and with autism (social difficulties) but the driver is paranoia and magical thinking, not communication deficits.",
        "A pervasive pattern of social and interpersonal deficits with cognitive-perceptual distortions and behavioral eccentricities: magical thinking, ideas of reference, unusual perceptions, odd speech, suspiciousness, odd behavior. At least 5 of 9 criteria, present since early adulthood. Limited insight into oddness."
      ],
      teach:"Schizotypal PD sits on the schizophrenia spectrum and is genetically linked to it. No sustained psychotic episodes distinguishes it from schizophrenia. Distinct from ASD: the eccentricity in schizotypal is driven by magical thinking and suspicion, not social-communication deficits."
    },
    {
      id:"hard-arfid", date:"2026-06-20", answer:"Avoidant/Restrictive Food Intake Disorder",
      accept:["avoidant restrictive food intake disorder","arfid","avoidant/restrictive food intake disorder","avoidant restrictive food intake disorder arfid"],
      clues:[
        "A 16-year-old is referred for significant weight loss. Their diet has always been limited to about eight \"safe\" foods — all beige, no sauces, no mixed textures — but recently they've eliminated three more foods after a frightening gagging episode at dinner.",
        "They're not afraid of gaining weight and have no body image concerns. They don't diet. Most foods are simply intolerably aversive — wrong texture, smell, or appearance triggers gagging or intense anxiety.",
        "They eat their safe foods without problem but refuse everything else even when hungry. Social eating is nearly impossible: they've skipped school events, avoided friend gatherings, and can't eat at restaurants.",
        "The pediatrician notes a BMI in the underweight range with iron and vitamin deficiencies. The pattern predates adolescence: \"they were an extremely selective eater as a toddler\" — long before any weight concerns could logically arise.",
        "Anxiety and sensory sensitivity profiles point toward a neurodevelopmental underpinning. A structured autism screen is pending. The restriction is not explained by a medical condition, food unavailability, or cultural practice.",
        "Consider what is absent: no fear of weight gain, no body image disturbance. This distinguishes the presentation sharply from anorexia, where food restriction is weight-motivated.",
        "Restriction of food intake based on sensory characteristics of food — resulting in significant weight loss, nutritional deficiency, and psychosocial impairment — without any body image disturbance. No medical condition accounts for the restriction."
      ],
      teach:"ARFID has three subtypes: sensory sensitivity (this case), fear of aversive consequences (choking/vomiting), and low interest in food. The critical differentiator from anorexia: no fear of weight gain driving restriction. Common comorbidity with ASD and anxiety disorders."
    },
    {
      id:"hard-bdd", date:"2026-06-19", answer:"Body Dysmorphic Disorder",
      accept:["body dysmorphic disorder","bdd","body dysmorphic disorder bdd","body dysmorphia"],
      clues:[
        "A 21-year-old comes in having sought cosmetic consultations with five surgeons in the past two years. Every surgeon declined to operate, saying they couldn't see the flaw the client describes.",
        "They're convinced their nose is asymmetrical in a way that makes them \"repulsive.\" They spend three to four hours daily checking it in mirrors, photographing it, and comparing themselves to others online.",
        "They've withdrawn from college and rarely leave the apartment. They're certain strangers stare at their nose on the street and have taken to wearing a hat pulled low over their face.",
        "On gentle confrontation, they acknowledge that others say they see nothing — but feel certain those people are wrong or just being kind. Reality testing is partially preserved but insight is poor.",
        "Preoccupation with a perceived defect that is not observable or appears slight to others, plus repetitive behaviors (mirror checking, comparing, reassurance-seeking) in response — causing significant distress and impairment.",
        "The checking rituals provide no relief and have escalated. Cosmetic procedures sought by clients with BDD rarely provide lasting benefit — the preoccupation typically migrates to another feature.",
        "Ruling out: OCD (the preoccupation is specifically about appearance, not a broader range of intrusive content), delusional disorder (partial reality testing preserved), anorexia (the concern is a specific feature, not overall body weight)."
      ],
      teach:"BDD is an OCD-spectrum disorder with high impairment and suicide risk. The perceived flaw is minimal or absent to observers, but the client's distress is genuine and intense. Distinguish from normative appearance concerns by time spent (hours daily) and functional impairment. Insight specifier matters for treatment planning."
    },
    {
      id:"hard-rad", date:"2026-06-18", answer:"Reactive Attachment Disorder",
      accept:["reactive attachment disorder","rad","reactive attachment disorder rad","reactive attachment"],
      clues:[
        "A 7-year-old in foster care is referred for \"refusing to bond.\" The current foster family reports the child doesn't seek comfort when hurt, shows no preference for them over strangers, and doesn't appear upset when the foster mother leaves.",
        "The child smiles rarely, rarely makes eye contact during nurturing interactions, and doesn't look to adults to share enjoyment during play. When distressed, they self-soothe by rocking rather than approaching caregivers.",
        "History: the child spent their first three years with a biological parent who was severely neglectful — irregular feeding, no response to crying, no consistent caregiver. They were removed at age 3.",
        "Developmental screening shows average cognitive ability. The flat, wary presentation appeared in early childhood and predates the foster placement — it isn't a reaction to this specific placement.",
        "A structured ASD assessment is negative. The child does respond socially in low-demand, low-novelty contexts with familiar peers — the withdrawal is relational and attachment-specific, not pervasive across all social interaction.",
        "The foster family is emotionally exhausted and starting to take the rejection personally. Psychoeducation about the origins of attachment dysregulation is a critical early intervention.",
        "Consistent pattern of inhibited, emotionally withdrawn behavior toward caregivers: rarely seeking or responding to comfort when distressed — plus persistent social-emotional disturbance (minimal social reciprocity, positive affect, and affect regulation) — resulting from severe early neglect of attachment needs."
      ],
      teach:"RAD results from pathogenic care (neglect, deprivation of attachment needs) before age 5. Distinguish from ASD: in RAD the social withdrawal is relational and attachment-specific, not pervasive. Distinguish from DSED (the other pathogenic-care diagnosis): DSED shows indiscriminate attachment to strangers rather than inhibited attachment to all."
    },
    {
      id:"hard-selective-mutism", date:"2026-06-17", answer:"Selective Mutism",
      accept:["selective mutism","elective mutism","selective mutism disorder"],
      clues:[
        "A 6-year-old girl has not spoken a single word to any teacher or classmate since starting kindergarten eight months ago. She participates in activities non-verbally and follows all instructions.",
        "At home with her immediate family she is talkative, animated, and fully age-appropriate in language. Her parents describe her as \"a completely different child\" at home.",
        "The teacher assumed it would resolve on its own. It hasn't — the child now communicates at school by pointing and whispering to her mother, who has begun attending school to \"translate.\" The accommodation is reinforcing the avoidance.",
        "Evaluation rules out a language disorder (home speech is age-appropriate), autism spectrum disorder (she is socially engaged at home and responsive non-verbally at school), and hearing loss.",
        "She shows visible physiological anxiety when called on in class — freezes, breaks eye contact, and shakes slightly. The failure to speak is not defiance or a voluntary choice.",
        "Consider the classification: this is an anxiety disorder, not a communication disorder or a conduct problem. The child can speak, does speak in safe contexts, and the failure to speak in school is driven by anxiety, not inability.",
        "Consistent failure to speak in specific social situations where speech is expected (school), despite speaking in other contexts (home) — lasting over one month, not limited to the first month of school, and causing educational and social impairment."
      ],
      teach:"Selective mutism is classified under anxiety disorders in DSM-5. Key: the child CAN speak and DOES speak in some contexts. The silence is anxiety-driven, not voluntary refusal. Early intervention is important — the pattern becomes self-reinforcing, and school accommodations (like parent attendance) can inadvertently maintain it."
    },
    {
      id:"hard-illness-anxiety", date:"2026-06-16", answer:"Illness Anxiety Disorder",
      accept:["illness anxiety disorder","health anxiety","hypochondria","hypochondriasis","illness anxiety"],
      clues:[
        "A 40-year-old comes in requesting a specialist referral. They've been convinced for three months that occasional fatigue and mild headaches signal a brain tumor.",
        "They've researched brain tumors extensively, check their pupils in the mirror daily, and have visited their PCP four times in three months. Each reassurance lasts about two days before the worry returns.",
        "After a normal MRI, they feel relief for about a week — then begin wondering whether it missed something, and shift to worrying about a different, harder-to-detect cancer.",
        "Somatic symptoms are minimal — the fatigue and headaches are mild and intermittent. The distress is almost entirely about what the symptoms might mean, not about the symptoms themselves.",
        "Over the past year the illness focus has shifted at least twice: from heart disease to multiple sclerosis to now brain tumor. Family members are exhausted by the repeated health scares.",
        "Consider what distinguishes this from Somatic Symptom Disorder: in SSD, distress centers on prominent, distressing somatic symptoms. Here, the somatic complaints are mild — the preoccupation is with the feared disease itself.",
        "Preoccupation with having or acquiring a serious illness, high health anxiety, easy alarm about health status — with excessive health-related checking behaviors despite mild or absent somatic symptoms, lasting ≥6 months, with shifting illness focus."
      ],
      teach:"Illness Anxiety Disorder (formerly hypochondriasis) is distinguished from Somatic Symptom Disorder by the relative absence of prominent somatic symptoms — the preoccupation is with the feared disease. The illness focus commonly shifts over time. Reassurance provides only brief relief and can reinforce the cycle."
    },
    {
      id:"hard-schizoid-pd", date:"2026-07-07", answer:"Schizoid Personality Disorder",
      accept:["schizoid personality disorder","schizoid personality","schizoid"],
      clues:[
        "A 38-year-old is referred by their PCP, who flagged they've declined all preventive care for years and appear to have no social support. The client attends with polite puzzlement — they don't see the concern.",
        "They live alone and have no close friendships. They've had one brief relationship in their twenties and describe it as 'more trouble than it was worth.' They prefer it this way — genuinely, not defensively.",
        "There is no apparent distress about the isolation. No sadness, no longing. 'I like being alone. I don't need other people.' The statement is flat and matter-of-fact, not bitter.",
        "Their interests are entirely solitary: a complex hobby pursued for fifteen years, reading, online chess. Their job minimizes face-to-face contact. They've worked there for nine years without issue.",
        "Their emotional range throughout the session is restricted — direct, concise, affectively flat. No interest in sex or romance. Relationships are described as draining and unnecessary rather than frightening.",
        "Asked about their inner life, they describe stability and quiet: no loneliness, no turbulence, no magical thinking, no perceptual distortions. The detachment is pervasive and entirely comfortable to them.",
        "A pervasive pattern of detachment from social relationships and restricted emotional expression: neither desiring nor enjoying close relationships, choosing solitary activities, little interest in sexual experiences, pleasure in few activities, no close friends, indifference to praise or criticism, emotional coldness and detachment. At least 4 of 7 criteria since early adulthood. Insight is limited — they experience this as simply preferring solitude."
      ],
      teach:"Schizoid PD is distinguished from avoidant PD by the absence of desire for connection (schizoid is indifferent to relationships; avoidant wants them desperately but fears rejection) and from schizotypal PD by the absence of magical thinking, ideas of reference, and cognitive-perceptual distortions. The ego-syntonic detachment — it doesn't feel like a problem to them — is the central diagnostic marker."
    },
    {
      id:"hard-aspd", date:"2026-07-08", answer:"Antisocial Personality Disorder",
      accept:["antisocial personality disorder","aspd","antisocial personality disorder aspd","antisocial personality","antisocial"],
      clues:[
        "A 34-year-old comes in on a court mandate following a fraud conviction. They are relaxed and pleasant, immediately positioning the evaluator as 'unusually perceptive.' The rapport-building is rapid and skillful.",
        "They describe the fraud as 'a game that got complicated.' The victims weren't really hurt, they say — 'they should have done their due diligence.' No remorse or discomfort is evident when discussing it.",
        "History: fighting at school, cruelty to animals at age 10, running away, fire-setting. They frame none of this as concerning: 'Kids test limits. I was just ahead of the curve.'",
        "In adulthood: multiple jobs ended abruptly or terminated for cause; two prior arrests, both pled down; debts left unpaid by relocating; serial short-duration relationships. The pattern has never interrupted their self-narrative of being smarter than the people around them.",
        "Throughout the session they are charming, make excellent eye contact, and answer questions fluently. Their account is internally inconsistent in several places — they're unconcerned when this is reflected back to them.",
        "They express genuine puzzlement at others' emotional reactions to being deceived. 'People get too attached to money. It wasn't personal.' The affect is polished and the self-awareness highly selective.",
        "A pervasive pattern of disregard for and violation of others' rights since age 15 — with documented conduct disorder before age 15: deceitfulness, impulsivity, irritability, reckless disregard for safety, irresponsibility, and absence of remorse. Age ≥18. Not occurring exclusively during a psychotic or bipolar episode."
      ],
      teach:"ASPD requires both the pervasive adult pattern and a history of conduct disorder before age 15. Presentations range from 'lifestyle antisocial' (serial irresponsibility, exploitation) to high-functioning with psychopathic features (charm, callousness, calculated manipulation). Neither overt violence nor charm is required — the diagnosis is about persistent disregard for others' rights as a stable trait."
    },
    {
      id:"hard-dissoc-amnesia", date:"2026-07-09", answer:"Dissociative Amnesia",
      accept:["dissociative amnesia"],
      clues:[
        "A 29-year-old is brought to the ER by a coworker after being found disoriented in the parking lot. They cannot recall the past three days — including how they got to work that morning.",
        "Neurological workup is completely normal: no seizures, no head trauma, no substance use detected on toxicology. MRI, EEG, and labs are all negative. Neurology finds no structural or metabolic explanation.",
        "A family member reports that three days ago the client attended a traumatic event — a sudden, unexpected death in the family — and 'just shut down' afterward.",
        "Outside the three-day gap, memory is intact: remote autobiographical memory, identity, and current-moment functioning are all normal. The amnesia is bounded — it surrounds a specific period.",
        "No psychotic symptoms, no mania, no mood episode. The client is calm, cooperative, and genuinely puzzled — they can describe the 'blankness' but cannot access anything within it.",
        "Unlike a fugue presentation, they haven't traveled or adopted a new identity. They know their name, their job, where they live. Only the three-day block is missing; everything before and after it remains accessible.",
        "Inability to recall important autobiographical information — typically of a traumatic or stressful nature — too extensive to be explained by ordinary forgetting, not attributable to substances, neurological conditions, or another mental disorder, causing significant distress or impairment."
      ],
      teach:"Dissociative amnesia is distinguished from neurological causes by the normal workup and the psychologically meaningful precipitant, and from normal forgetting by the extent and bounding of the gap around a stressful event. Dissociative fugue is now a specifier (not a separate diagnosis in DSM-5) for episodes involving purposeful travel or assumption of a new identity during the amnesic period — not present here."
    },
    {
      id:"hard-dsed", date:"2026-07-10", answer:"Disinhibited Social Engagement Disorder",
      accept:["disinhibited social engagement disorder","dsed","disinhibited social engagement disorder dsed","disinhibited social engagement"],
      clues:[
        "A 5-year-old recently adopted from institutional care is referred for behavior the adoptive parents describe as 'bizarrely friendly.' He approaches strangers in the park, asks to be carried, and will follow unfamiliar adults without hesitation or a backward glance.",
        "In the waiting room he immediately climbed into the receptionist's lap and showed no concern that his adoptive parents were across the room. He attached to any available adult with equal enthusiasm.",
        "The adoptive parents are warm, attentive, and describe a rich home environment. He eats well, plays freely, shows affection — but doesn't prefer them over strangers in moments of need or distress.",
        "History: the first three years of his life were spent in an institution with rotating, overwhelmed caregivers and no consistent attachment figure. He was adopted at 3 years and 4 months.",
        "Developmental and cognitive assessments are age-appropriate. Social engagement is not the problem — he is actively and eagerly social. The problem is the complete absence of normal caution with strangers, and failure to check back with his caregivers.",
        "ADHD evaluation doesn't account for the pattern — this is not task-based impulsivity. The behavior is specifically relational: he seeks affection from any adult, without filtering by safety or familiarity.",
        "A pattern of culturally inappropriate, overly familiar behavior with unfamiliar adults — reduced reticence approaching strangers, overly familiar verbal or physical behavior, willingness to go off with strangers — arising from a history of insufficient caregiving, present after age 12 months, causing social impairment."
      ],
      teach:"DSED contrasts with RAD: both arise from pathogenic early care but in opposite directions — RAD produces inhibited emotional withdrawal from caregivers; DSED produces indiscriminate approach to all adults. DSED can persist even after placement in a caring environment and requires specific, patience-paced intervention beyond simply providing a nurturing home."
    },
    {
      id:"hard-factitious", date:"2026-07-11", answer:"Factitious Disorder",
      accept:["factitious disorder","factitious disorder imposed on self","munchausen syndrome","munchausen"],
      clues:[
        "A 31-year-old nurse is admitted to hematology for a third time with unexplained clotting abnormalities. Each prior admission was inconclusive, and symptoms resolved without a clear cause each time.",
        "Staff notice the client has expert knowledge of which lab values would suggest anticoagulant use. They've been observed near the medication cart. A urine toxicology screen detects warfarin not listed in their current prescription.",
        "Their medical history spans multiple hospitals with different presentations that don't cohere into any recognized disease pattern. The chart is extensive, and key claims are difficult to verify across institutions.",
        "They're relaxed and sociable on the ward during the day but report dramatic symptom spikes whenever discharge is discussed. The pattern of distress tracks precisely with the threat of leaving.",
        "When gently confronted, they deny self-administering the warfarin. There is no obvious external gain: no insurance fraud, no disability claim, no legal benefit. Income and coverage are stable.",
        "Off-chart contacts reveal prior admissions at other institutions with similarly unexplained findings. A note from a previous clinical team at another hospital raises the same concern, with the same pattern documented.",
        "Falsification of physical signs or symptoms, or induction of illness or injury, associated with identified deception — in the absence of obvious external incentives. The individual presents themselves as ill or injured, motivated by the sick role itself, not by tangible external reward."
      ],
      teach:"Factitious disorder is diagnosed when deception is confirmed and there is no apparent external incentive — this distinguishes it from malingering. The motivation is the sick role: staff attention, care, and the identity of being a patient. Healthcare workers are overrepresented because they know how to mimic illness convincingly. Confrontation requires careful planning; denial is the expected and typical response."
    },
    {
      id:"hard-mild-ncd", date:"2026-07-12", answer:"Mild Neurocognitive Disorder",
      accept:["mild neurocognitive disorder","mild ncd","mild cognitive impairment","mci"],
      clues:[
        "A 68-year-old retired engineer comes in with their spouse, who says 'they're not themselves.' The client attends willingly: 'I've noticed it too. I'm slower now. Things slip.'",
        "Neuropsychological testing shows mild but consistent deficits in episodic memory and processing speed — below expectations for age, education level, and prior function. Results are meaningfully lower than testing performed two years ago.",
        "They live independently and manage their finances, drive safely, and keep appointments without assistance. Daily function is essentially intact — though they've started using lists and phone reminders they never previously needed.",
        "They occasionally lose track of what they were doing mid-task, repeat themselves more in conversation, and took significantly longer to learn a new device. Their spouse confirms these patterns have developed gradually over 12 to 18 months.",
        "No delirium. No acute change. No current psychiatric or prominent behavioral symptoms. Full neurological workup — including imaging and labs — is pending.",
        "The clinical question is not whether there is decline — testing confirms there is — but how to classify it. The independence criterion is the key variable here.",
        "Modest cognitive decline from a prior level in one or more cognitive domains — supported by the individual's concern, a knowledgeable informant's report, and objective testing — that does not interfere with independence in daily activities. Not occurring exclusively during delirium."
      ],
      teach:"Mild NCD (formerly mild cognitive impairment) is defined by the preserved independence criterion — this is what distinguishes it from major NCD (dementia). Compensatory strategies like lists and reminders maintain independence but are themselves a clinical signal. Etiology matters: Alzheimer's, vascular, Lewy body, and frontotemporal subtypes have distinct profiles and different clinical and prognostic implications."
    },
    {
      id:"hard-mdd-melancholic", date:"2026-07-13", answer:"Major Depressive Disorder, With Melancholic Features",
      accept:["major depressive disorder with melancholic features","major depressive disorder, with melancholic features","mdd with melancholic features","melancholic depression"],
      clues:[
        "A 52-year-old is referred after six weeks of depression that hasn't responded to the antidepressant their PCP started. They describe this episode as qualitatively unlike anything they've experienced before: 'It's not sadness. It's more like being stopped.'",
        "There is a complete absence of pleasure across all activities — including those that have always been reliable mood-lifters. No good hours, no distraction. The anhedonia is total and unresponsive to normally enjoyable stimuli.",
        "Mood is characteristically worse in the morning. They wake around 4 AM and cannot return to sleep. By afternoon they feel marginally less terrible, though never actually well.",
        "They've lost 10 lbs without trying. Movements and speech are visibly slowed — it takes visible effort to respond to questions. Guilt is disproportionate and fixed: they're convinced they've been a terrible parent, despite their adult children's protests.",
        "The quality of this episode is distinct from grief or any situational reaction. There is no clear precipitant. The symptom pattern — morning worsening, early awakening, psychomotor disturbance, and profound anhedonia — has a neurovegetative character.",
        "No history of mania or hypomania. No psychotic features. No medical cause on workup. Two prior depressive episodes over twenty years did not have this quality.",
        "Full MDE criteria plus: loss of pleasure in almost all activities or absence of reactivity to pleasurable stimuli, plus at least three additional features — a qualitatively distinct depressed mood, regular morning worsening, early morning awakening, observable psychomotor disturbance, significant anorexia or weight loss, and excessive or inappropriate guilt."
      ],
      teach:"The melancholic specifier identifies a biologically-driven, neurovegetative depressive pattern that is less responsive to psychotherapy or placebo alone and more likely to respond to somatic treatments (tricyclic antidepressants, ECT, or MAOIs in refractory cases). The qualitative distinctness — often described as an absence or numbness rather than sadness — is clinically meaningful and prognostically relevant."
    },
    {
      id:"hard-stimulant-ud", date:"2026-07-14", answer:"Stimulant Use Disorder",
      accept:["stimulant use disorder"],
      clues:[
        "A 27-year-old is brought to the ER by a roommate after three days without sleep. They're agitated, speech is rapid, and there are fresh skin sores on their arms from repetitive picking. The roommate says this is the fourth similar episode this year.",
        "Between these acute episodes the client describes days of profound fatigue, excessive sleep, and inability to feel pleasure — craving the drug intensely. These post-binge crashes last several days before the cycle resumes.",
        "First use at 19 for studying. Use escalated following a job loss at 24. Now daily use, primarily to forestall the crash: 'I take it to feel normal,' they say between bursts of agitation.",
        "They've lost 25 lbs in six months. Dental health has deteriorated significantly. Rent is two months unpaid and they've lost their job. Four serious attempts to stop in the past year — the longest lasted nine days.",
        "The roommate reports paranoid ideation during binges: accusations that the roommate was 'planting things,' barricading the door, refusing food prepared by anyone else. These clear consistently within 24 hours of abstinence.",
        "No psychiatric history predates the drug use. The paranoia, skin-picking, and agitation emerge with use and resolve with abstinence — they are substance-induced, not independent of the drug.",
        "A pattern of stimulant use causing significant impairment: tolerance, a characteristic withdrawal syndrome (hypersomnia, fatigue, anhedonia), using more than intended, repeated failed efforts to stop, and continued use despite physical deterioration and loss of employment and relationships."
      ],
      teach:"Stimulant Use Disorder (methamphetamine in this presentation) can produce substance-induced psychotic symptoms — paranoia, ideas of reference — that must be distinguished from a primary psychotic disorder. The key: onset with use, resolution with abstinence. The crash (hypersomnia, dysphoria, anhedonia) is a withdrawal syndrome and a powerful driver of continued use."
    },
    {
      id:"hard-bipolar-rapid", date:"2026-07-15", answer:"Bipolar I Disorder, With Rapid Cycling",
      accept:["bipolar i disorder with rapid cycling","bipolar i disorder, with rapid cycling","bipolar 1 disorder with rapid cycling","bipolar i rapid cycling","bipolar rapid cycling","rapid cycling bipolar","bipolar i disorder","bipolar 1 disorder"],
      clues:[
        "A 36-year-old comes in for a medication review. They've carried a Bipolar I diagnosis for eight years. Their current mood stabilizer 'doesn't seem to be holding' — the chart shows four distinct mood episodes in the past twelve months.",
        "Each episode lasts two to six weeks, with non-gradual transitions. A Monday of tearfulness and passive suicidal ideation can be followed within days by a Thursday of expansiveness, rapid speech, and minimal sleep without distress.",
        "The past twelve months include a full manic episode requiring hospitalization in February, a major depressive episode in March and April, a briefer hypomanic period in July, and a second depressive episode now resolving.",
        "Prior to the current mood stabilizer, they were treated with antidepressants alone — the period they describe as when the mood switching became most frequent and most severe.",
        "Thyroid function is normal. Urine toxicology is negative. The current medication regimen has been unchanged for fourteen months — the cycling pattern is not a recent medication effect.",
        "They've been on lamotrigine for six months with partial benefit and are asking whether their antidepressant history played a role in accelerating the cycling frequency.",
        "Bipolar I disorder — confirmed by a lifetime manic episode meeting full criteria — with four or more mood episodes in the past twelve months, each meeting full criteria for manic, hypomanic, or major depressive episode, separated by at least partial remission or a switch to an opposite-polarity episode."
      ],
      teach:"Rapid cycling (≥4 mood episodes in 12 months) is a course specifier applicable to both Bipolar I and II — not a separate disorder. It affects 10–20% of bipolar patients and is associated with worse prognosis and treatment resistance. Antidepressant use may trigger or maintain rapid cycling in susceptible individuals; reviewing medication history is essential when this specifier applies."
    },
    {
      id:"hard-schizophreniform", date:"2026-07-16", answer:"Schizophreniform Disorder",
      accept:["schizophreniform disorder","schizophreniform"],
      clues:[
        "A 22-year-old with no prior psychiatric history is brought to the ER by roommates after two weeks of escalating disorganization: barricading the dorm room, speaking to people who aren't there, and sending incoherent emails to professors.",
        "On exam: auditory hallucinations (voices commenting on his actions), persecutory delusions (convinced the university is experimenting on him through the building's ventilation), and marked disorganization in thought and behavior.",
        "Medical workup is negative: no substance use, no autoimmune encephalitis, no thyroid or metabolic abnormality. The presentation is psychiatric.",
        "He started antipsychotics six days ago and is showing early improvement — disorganization is decreasing, though hallucinations persist. The team estimates the acute episode onset was approximately five to six weeks ago.",
        "Premorbid functioning was good — academically successful, socially active. His mother notes a few months of social withdrawal and odd comments before the acute onset, but nothing alarming at the time.",
        "The timeline is the critical diagnostic anchor here. Whether or not this diagnosis holds depends entirely on what happens over the next several weeks.",
        "Two or more active-phase schizophrenia symptoms — including at least one of delusions, hallucinations, or disorganized speech — present for at least one month, with total episode duration (including prodromal and residual phases) less than six months. Good premorbid functioning and absence of blunted affect are associated with a more favorable prognosis."
      ],
      teach:"Schizophreniform disorder is essentially schizophrenia that has not yet met the 6-month duration criterion. If symptoms persist past 6 months total — including prodromal and residual phases — the diagnosis converts to schizophrenia. Good premorbid functioning and abrupt rather than insidious onset are positive prognostic indicators."
    }
  ]
};

const MAX = { easy:5, medium:6, hard:7 };
const LABEL = { easy:"Easy", medium:"Medium", hard:"Hard" };
const DIFFS = ["easy","medium","hard"];
