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
    },
    {
      id:"easy-pdd", date:"2026-06-29", answer:"Persistent Depressive Disorder",
      accept:["persistent depressive disorder","dysthymia","pdd","persistent depressive disorder dysthymia","chronic depression"],
      clues:[
        "A 30-year-old says they don't remember the last time they felt genuinely good — \"I think this is just my personality.\" They're only here because their partner insisted.",
        "For at least two years they've had low mood more days than not, alongside poor appetite, low energy, poor concentration, and low self-esteem.",
        "They've never had a period of two months without these symptoms during that time. There's no history of mania or hypomania, and no single event triggered it — it's just been a low hum for years.",
        "They function — they hold a job and keep up appearances — but describe their life as \"gray,\" and say they assumed everyone felt this way.",
        "Depressed mood for most of the day, more days than not, for at least two years, with at least two additional symptoms (appetite or sleep change, low energy, poor concentration, low self-esteem, or hopelessness), without a symptom-free period longer than two months. Good insight once it's named, though they hadn't recognized it as anything but their baseline."
      ],
      teach:"PDD requires ≥2 years of depressed mood (1 year in children/adolescents) without a 2-month symptom-free gap, and can co-occur with MDD episodes ('double depression'). Its chronicity often leads patients to mistake it for personality rather than a treatable condition."
    },
    {
      id:"easy-bulimia", date:"2026-06-30", answer:"Bulimia Nervosa",
      accept:["bulimia nervosa","bulimia","bn"],
      clues:[
        "A 21-year-old comes in at her roommate's suggestion. Her weight is in the normal range, so she's surprised anyone is concerned.",
        "She describes recurrent episodes, a few times a week, of eating a large amount of food in a short period while feeling out of control — followed by self-induced vomiting to \"undo\" it.",
        "This pattern has gone on for about four months. She also uses laxatives occasionally and exercises compulsively the day after an episode, and dental enamel erosion was noted at a recent checkup.",
        "Her self-evaluation is heavily tied to her shape and weight; she describes her worth as \"basically a number on the scale.\" She knows the cycle is unhealthy and wants it to stop, but feels she can't control the urges once they start.",
        "Recurrent episodes of binge eating paired with recurrent inappropriate compensatory behavior (self-induced vomiting, laxative use, excessive exercise), occurring at least once a week for three months, with self-evaluation unduly influenced by body shape and weight — at a normal or near-normal body weight. Good insight that the behavior is a problem."
      ],
      teach:"Bulimia is distinguished from anorexia binge-purge subtype by body weight: bulimia occurs at normal/near-normal weight. Frequency threshold is ≥1x/week for 3 months. Dental erosion and parotid gland swelling are physical clues to purging."
    },
    {
      id:"easy-bed", date:"2026-07-01", answer:"Binge-Eating Disorder",
      accept:["binge eating disorder","bed","binge-eating disorder"],
      clues:[
        "A 36-year-old comes in distressed about his eating. \"I just feel out of control around food sometimes, and I hate myself after,\" he says.",
        "About twice a week he eats a very large amount of food in a short period, feeling unable to stop. He often eats alone afterward out of embarrassment.",
        "During these episodes he eats much faster than normal, eats until uncomfortably full, and eats large amounts even when not physically hungry.",
        "He's never vomited, used laxatives, or exercised to compensate — there's just the binge, followed by intense guilt and shame.",
        "Recurrent binge eating episodes (rapid eating, eating past fullness, eating alone due to embarrassment, eating without hunger, guilt afterward) at least once a week for three months, with marked distress, and without any compensatory behaviors."
      ],
      teach:"BED's key differentiator from bulimia is the absence of compensatory behavior. It's the most common eating disorder and can occur across the weight spectrum — diagnosis hinges on the binge pattern and distress, not on weight."
    },
    {
      id:"easy-oud", date:"2026-07-02", answer:"Opioid Use Disorder",
      accept:["opioid use disorder","oud","opioid dependence","opioid addiction"],
      clues:[
        "A 33-year-old comes in after a coworker noticed he'd been \"off\" lately. He was prescribed oxycodone after a back injury eight months ago and never really stopped.",
        "He takes more than prescribed, has run out early multiple months in a row, and has tried to cut back twice without success.",
        "He spends a notable amount of time obtaining pills, sometimes from a second doctor, and says he needs roughly twice his original dose to get the same relief.",
        "He missed his cousin's wedding because he didn't want to be without his supply, and recently took a lower-paying job so he could stay closer to home, near medication he keeps hidden.",
        "When he tried stopping for two days, he had nausea, sweating, diarrhea, and intense cravings. A pattern of opioid use causing significant impairment over the past year: tolerance, withdrawal, using more than intended, failed attempts to cut down, excessive time spent obtaining the drug, and activities given up in favor of use."
      ],
      teach:"OUD criteria mirror other substance use disorders: tolerance, withdrawal, loss of control, and functional consequences. Tolerance/withdrawal alone in a patient taking opioids exactly as prescribed for pain doesn't equal OUD — the additional criteria (loss of control, time spent, activities given up) are what tip the diagnosis."
    },
    {
      id:"easy-hoarding", date:"2026-07-03", answer:"Hoarding Disorder",
      accept:["hoarding disorder","hoarding"],
      clues:[
        "A 58-year-old is referred after a building inspector found their apartment unsafe to enter. The client insists they're \"just frugal\" and everything has a use.",
        "They report persistent difficulty discarding possessions, regardless of actual value, because of a perceived need to save them or distress at the thought of letting go.",
        "Stacks of newspapers, broken appliances, and unopened mail now cover most surfaces and block two doorways. They haven't had guests over in years out of embarrassment.",
        "Family members who've tried to help clean in the past describe the client becoming distressed, almost panicked, when items were removed without their input.",
        "This has built up gradually over roughly a decade and now poses a genuine safety and fire-code hazard. Persistent difficulty discarding possessions due to a perceived need to save them, resulting in clutter that congests living areas and compromises their intended use, causing significant distress or impairment."
      ],
      teach:"Hoarding disorder was split out from OCD in DSM-5. Key features: difficulty discarding (not compulsive acquiring alone), clutter that actually obstructs living spaces, and distress tied to discarding rather than to the clutter itself."
    },
    {
      id:"easy-bdd", date:"2026-07-04", answer:"Body Dysmorphic Disorder",
      accept:["body dysmorphic disorder","bdd","body dysmorphia"],
      clues:[
        "A 24-year-old asks for a referral to a plastic surgeon, convinced their nose is \"deformed.\" Photos show a nose well within normal range.",
        "They report checking mirrors dozens of times a day, and other times avoiding mirrors entirely because the sight is too distressing. They've started wearing a hat low on their face.",
        "They estimate spending over three hours a day thinking about their nose. They've turned down two job interviews and stopped seeing friends in person, communicating mainly by text instead.",
        "They've already seen two surgeons who declined to operate, telling them there was nothing to fix — but the client felt unheard and is now researching surgeons abroad.",
        "Preoccupation with a perceived flaw in physical appearance that is not observable or appears slight to others, with repetitive behaviors (mirror checking, camouflaging) or mental acts in response, causing significant distress and functional impairment. Poor insight — convinced the flaw is real and severe."
      ],
      teach:"BDD insight ranges from good to delusional (DSM-5 allows specifying 'with absent insight/delusional beliefs'). Repeated cosmetic consultations without satisfaction is a hallmark pattern; surgery rarely resolves the preoccupation."
    },
    {
      id:"easy-bipolar2", date:"2026-07-05", answer:"Bipolar II Disorder",
      accept:["bipolar ii disorder","bipolar 2 disorder","bipolar ii","bipolar 2"],
      clues:[
        "A 27-year-old comes in primarily for depression. Three separate depressive episodes in the past two years left her barely able to get out of bed.",
        "Between those, she describes week-long stretches of high energy, needing only four hours of sleep, talking fast, and taking on far more projects than usual.",
        "During those high periods she's never been hospitalized, never had psychosis, and colleagues mostly just describe her as \"extra productive\" — friends notice the shift, but it's never derailed her life.",
        "She didn't think to mention these periods at first because, to her, they felt like the good weeks, not a problem worth bringing up.",
        "At least one major depressive episode and at least one hypomanic episode — elevated mood with increased activity/energy lasting at least four days, noticeable to others but not severe enough to cause marked impairment or require hospitalization. No history of a full manic episode."
      ],
      teach:"Bipolar II requires hypomania (≥4 days, noticeable but not impairing) plus at least one major depressive episode — never a full manic episode (that would make it Bipolar I). Patients often present for depression and don't volunteer hypomanic periods unprompted because they don't feel like a problem."
    },
    {
      id:"easy-excoriation", date:"2026-07-06", answer:"Excoriation (Skin-Picking) Disorder",
      accept:["excoriation disorder","skin picking disorder","excoriation (skin-picking) disorder","dermatillomania","skin-picking disorder"],
      clues:[
        "A 26-year-old comes in wearing long sleeves despite the summer heat. She mentions almost in passing that she's \"a picker\" and has been since her teens.",
        "She describes picking at minor skin imperfections — small bumps, healing scabs — until they bleed, especially during stressful moments or while watching TV.",
        "She's tried multiple times to stop on her own and has covered her arms for over a year because of visible scarring. The picking sessions can last over an hour and she often doesn't notice time passing.",
        "She feels real shame about it and has turned down a pool party invitation because of the scars, but the urge to pick, once it starts, is very hard to interrupt.",
        "Recurrent skin picking resulting in lesions, with repeated attempts to decrease or stop the behavior, causing clinically significant distress or impairment — not attributable to a substance or another medical or dermatological condition."
      ],
      teach:"Excoriation disorder belongs to the OCD-related cluster, alongside trichotillomania. It's reported more often in clinical samples of women, partly because visible scarring carries different social stakes — though the underlying urge-driven mechanism doesn't differ by sex. Distinguish from a dermatological condition by the repetitive, urge-driven self-inflicted pattern."
    },
    {
      id:"easy-mdd-psychotic", date:"2026-05-17", answer:"Major Depressive Disorder, With Psychotic Features",
      accept:["major depressive disorder with psychotic features","psychotic depression","mdd with psychotic features","depression with psychotic features","major depression with psychosis"],
      clues:[
        "A 52-year-old retired accountant is brought in by his wife, who says he's barely eaten or spoken in six weeks and has stopped answering the phone.",
        "He describes depressed mood every day, has lost all interest in golf and his grandchildren, and struggles to concentrate on even simple tasks.",
        "His wife mentions he's been muttering that he's \"already dead inside\" and insists he's secretly bankrupted the family through fraud — a fixed belief he won't budge on even when she shows him their intact bank statements.",
        "He also admits, reluctantly, to hearing a low voice telling him he's worthless and deserves to be punished. These experiences occur only on his worst depressive days; outside of this episode he has no history of odd beliefs or unusual perceptions, and he can acknowledge afterward that the thoughts \"don't really add up.\"",
        "Meets full criteria for a major depressive episode — mood, anhedonia, and associated symptoms nearly every day for over two weeks with clear impairment — accompanied by fixed false beliefs and a derogatory auditory perception that occur exclusively during, and match the themes of, the depressive episode, with no such experiences outside mood episodes."
      ],
      teach:"Psychotic features in depression are typically mood-congruent (themes of guilt, punishment, nihilism) and occur only during the depressive episode — unlike schizoaffective disorder, where psychosis persists outside mood episodes. Patients often underreport these symptoms out of shame, so direct screening is essential."
    },
    {
      id:"easy-mdd-anxious", date:"2026-05-18", answer:"Major Depressive Disorder, With Anxious Distress",
      accept:["major depressive disorder with anxious distress","mdd with anxious distress","anxious depression","depression with anxious distress"],
      clues:[
        "A 29-year-old marketing associate comes in describing \"months of feeling wound tight and joyless\" that have made it hard to get through the workday.",
        "She reports low mood nearly every day, has lost interest in painting and seeing friends, feels drained, and has trouble concentrating — symptoms that have been building for over two months.",
        "Alongside this, she says she feels \"keyed up\" and tense almost constantly, with restless legs that make it hard to sit still through meetings.",
        "She also describes a persistent, hard-to-shake worry that something terrible is about to happen to her or her family, and a fear that she might suddenly \"lose it\" and be unable to control her racing thoughts. She denies discrete panic attacks and has never had a period of elevated or expansive mood.",
        "Full criteria for a major depressive episode are present, accompanied by at least two of the following occurring on most days of the episode: feeling keyed up or tense, unusual restlessness, difficulty concentrating due to worry, fear that something awful may happen, and fear of losing control."
      ],
      teach:"The anxious distress specifier flags patients at higher risk for suicidality and poorer treatment response, prompting closer monitoring even though it doesn't change the core diagnosis. It's distinguished from a separate anxiety disorder by occurring squarely within a depressive episode."
    },
    {
      id:"easy-mdd-melancholic", date:"2026-05-19", answer:"Major Depressive Disorder, With Melancholic Features",
      accept:["major depressive disorder with melancholic features","mdd with melancholic features","melancholic depression"],
      clues:[
        "A 61-year-old retired mechanic tells his doctor that nothing brings him pleasure anymore — not even the morning coffee ritual he's loved for thirty years.",
        "He describes a near-total loss of pleasure in every activity, and says his mood doesn't lift even briefly when his grandchildren visit — he calls it \"a different kind of sadness\" than any grief he's felt before.",
        "His mood and energy are consistently worst first thing in the morning; he wakes at 4am daily unable to fall back asleep, and his appetite has vanished, with a 15-pound weight loss over the past month.",
        "His wife notes he's visibly slowed down — his movements and speech have become noticeably sluggish — and he's become excessively, disproportionately guilty over a minor work mistake from decades ago.",
        "Full criteria for a major depressive episode are present, with near-complete loss of pleasure in all activities and no reactivity to positive events, plus a distinctly different quality of low mood, regular morning worsening, early-morning awakening, marked psychomotor slowing, significant appetite loss with weight loss, and excessive or inappropriate guilt."
      ],
      teach:"Melancholic features imply a more biologically loaded presentation — complete anhedonia, lack of mood reactivity, diurnal worsening, and psychomotor change — historically associated with strong response to antidepressants or ECT."
    },
    {
      id:"easy-mdd-peripartum", date:"2026-05-20", answer:"Major Depressive Disorder, With Peripartum Onset",
      accept:["major depressive disorder with peripartum onset","postpartum depression","peripartum depression","mdd with peripartum onset"],
      clues:[
        "A 27-year-old woman is brought in by her husband three weeks after the birth of their first child, saying she feels overwhelmed and \"like a terrible mother.\"",
        "She describes depressed mood most of the day, frequent tearfulness, and loss of interest in the baby and things she used to enjoy, starting about a week before delivery.",
        "She's exhausted beyond what's expected from normal newborn sleep loss, has little appetite, struggles to concentrate on simple tasks, and feels intense guilt that she isn't bonding with the baby \"the way she's supposed to.\"",
        "She denies any thoughts of harming the baby and has no hallucinations; her husband confirms she has no prior psychiatric history outside of pregnancy.",
        "Full criteria for a major depressive episode are present, with onset during pregnancy or within four weeks of delivery."
      ],
      teach:"DSM-5 restricts this specifier to onset during pregnancy through four weeks postpartum, though clinicians often watch for depressive symptoms well beyond that window. Screening should always include direct, nonjudgmental questions about intrusive thoughts of harming the infant, which this patient denied."
    },
    {
      id:"easy-mdd-seasonal", date:"2026-05-21", answer:"Major Depressive Disorder, With Seasonal Pattern",
      accept:["major depressive disorder with seasonal pattern","seasonal affective disorder","mdd with seasonal pattern","seasonal depression"],
      clues:[
        "A 38-year-old teacher comes in during January saying, \"this happens every winter\" — low mood and low energy that started back in November.",
        "She describes depressed mood and loss of interest nearly every day, sleeping 10 hours a night, and craving carbohydrates with noticeable weight gain — a pattern she says shows up every winter.",
        "Looking back over her history, this same pattern has occurred for the last four winters, fully resolving by April or May each time without any treatment, with no depressive episodes at all during spring or summer.",
        "She has no history of elevated or expansive mood, and the timing is so reliable that she now dreads the clocks changing every fall.",
        "A regular temporal relationship between the onset of major depressive episodes and a particular time of year, present for at least two consecutive years, with full remission also occurring at a characteristic time of year, and seasonal episodes substantially outnumbering any nonseasonal episodes over her lifetime."
      ],
      teach:"This specifier requires a reliable two-year history of episodes tied to a specific season with full interepisode remission — a single low winter isn't enough. It's especially associated with fall/winter onset, hypersomnia, and carbohydrate craving, and often responds to light therapy."
    },
    {
      id:"easy-dmdd", date:"2026-05-22", answer:"Disruptive Mood Dysregulation Disorder",
      accept:["disruptive mood dysregulation disorder","dmdd"],
      clues:[
        "A 9-year-old boy is brought in by his mother after his third school suspension this year; both teachers and family describe him as \"constantly on the verge of exploding.\"",
        "Between blowups, he's still described as chronically grumpy, irritable, or angry — his teacher says there's no \"good version\" of him lately, with an irritable mood present most of the day, nearly every day.",
        "On top of that baseline irritability, he has severe temper outbursts several times a week — screaming, throwing objects, once flipping a desk — wildly out of proportion to the trigger, such as being asked to pause a video game, occurring both at home and at school.",
        "This pattern has been going on for over a year, clearly started before age 8, and he's never had a distinct stretch of elevated, euphoric mood, grandiosity, or reduced need for sleep lasting more than a day.",
        "Severe, recurrent temper outbursts grossly out of proportion in intensity or duration to the situation, occurring three or more times per week, against a background of persistently irritable or angry mood between outbursts on most days, present for at least 12 months across multiple settings, with onset before age 10 and no history of a full manic or hypomanic episode."
      ],
      teach:"This diagnosis was added partly to curb overdiagnosis of pediatric bipolar disorder in children with chronic, non-episodic irritability. The key differentiator from bipolar disorder is the absence of any distinct manic or hypomanic episode — the irritability is a persistent baseline, not an episodic mood elevation."
    },
    {
      id:"easy-pmdd", date:"2026-05-23", answer:"Premenstrual Dysphoric Disorder",
      accept:["premenstrual dysphoric disorder","pmdd"],
      clues:[
        "A 33-year-old woman says, \"the week before my period, I don't recognize myself\" — she's been tracking her symptoms daily for three cycles at her OB's suggestion.",
        "In the week before her period she becomes markedly irritable and tearful, with sudden mood swings and a sense of hopelessness that's completely absent the rest of the month.",
        "During that same window she also notices anxiety and tension, a drop in interest in her usual hobbies, low energy, poor concentration, and food cravings with appetite changes.",
        "Her symptom diary confirms the pattern starts the week before menses and resolves within a few days after her period begins, with minimal symptoms in the week following; the swings have clearly strained her marriage and work performance, and she has no symptoms this severe at any other point in her cycle.",
        "In most menstrual cycles over the past year, five or more affective and physical symptoms — including marked mood lability, irritability, and depressed mood or hopelessness — emerge in the final week before menses, improve within days of menses onset, and become minimal or absent the following week, confirmed across at least two prospectively charted cycles and clearly interfering with functioning."
      ],
      teach:"This diagnosis is distinguished from ordinary premenstrual symptoms by its severity, timing, and prospective confirmation with symptom diaries across at least two cycles — retrospective recall alone is notoriously unreliable here."
    },
    {
      id:"easy-bipolar1-psychotic", date:"2026-05-24", answer:"Bipolar I Disorder, With Psychotic Features",
      accept:["bipolar i disorder with psychotic features","bipolar 1 with psychotic features","bipolar disorder with psychotic features","mania with psychotic features"],
      clues:[
        "A 24-year-old man is brought to the ER by his roommates, who say he hasn't slept in four days and has been \"acting like a completely different person.\"",
        "For the past week he's had an elevated, euphoric mood, rapid speech that jumps between topics, grandiose plans to \"revolutionize the tech industry,\" and seemingly boundless energy despite almost no sleep.",
        "He maxed out three credit cards buying equipment for a startup he dreamed up overnight and has been calling investors at 3am — behavior his roommates say is completely out of character.",
        "In the ER he insists he's been chosen to lead a technological renaissance and believes news anchors are subtly referencing his plans on television; he shows no awareness that anything is wrong.",
        "A distinct period of abnormally and persistently elevated, expansive mood and increased goal-directed activity lasting at least a week and severe enough to require hospitalization, accompanied by grandiosity, decreased need for sleep, pressured speech, flight of ideas, and excessive involvement in risky activities, with grandiose false beliefs present during the episode."
      ],
      teach:"A single manic episode meeting full criteria is sufficient for this diagnosis. The psychotic features here are mood-congruent and occur only during the mood episode, distinguishing it from schizoaffective disorder or a primary psychotic illness."
    },
    {
      id:"easy-bipolar1-rapid", date:"2026-05-25", answer:"Bipolar I Disorder, With Rapid Cycling",
      accept:["bipolar i disorder with rapid cycling","bipolar 1 with rapid cycling","rapid cycling bipolar disorder","bipolar disorder with rapid cycling"],
      clues:[
        "A 45-year-old woman comes in for a medication review, saying \"my moods have been all over the map this year\" — her chart shows five urgent contacts with providers in the past 12 months.",
        "Reviewing the timeline: in February she had two weeks of elevated mood, grandiosity, and reckless spending requiring brief hospitalization; by April she'd sunk into a distinct three-week stretch of low mood, anhedonia, and oversleeping.",
        "The pattern repeated — an elevated stretch in June, a low stretch in August, another elevated episode in October — each lasting long enough and severe enough to meet full criteria on its own, with a return to her baseline mood for a couple of weeks separating some of them.",
        "In total she's had four distinct mood episodes within the past 12 months, each clearly demarcated from the next either by a period of remission or by a switch to the opposite mood state.",
        "A history that meets criteria for episodes of both elevated and depressed mood, with at least four distinct mood episodes occurring within a single 12-month period, each demarcated by either partial or full remission or by a switch to an episode of the opposite polarity."
      ],
      teach:"This is a course specifier requiring four or more distinct mood episodes in 12 months, each separated by remission or a polarity switch — it describes episode frequency, not a different underlying diagnosis, and is associated with a more difficult treatment course."
    },
    {
      id:"easy-cyclothymia", date:"2026-05-26", answer:"Cyclothymic Disorder",
      accept:["cyclothymic disorder","cyclothymia"],
      clues:[
        "A 31-year-old man comes in saying, \"I've just always been up and down, but never bad enough to get help until now\" — relationship strain finally prompted the visit.",
        "For the past three years, going back to college, he's cycled between stretches of feeling unusually upbeat, talkative, and full of ideas, and stretches of feeling low, unmotivated, and self-critical.",
        "Neither extreme has ever been severe enough to count as a full high or full low episode on its own — the \"up\" periods never involved hospitalization-level grandiosity or reckless behavior, and the \"down\" periods never lasted a full two weeks with the complete symptom picture.",
        "Over these three years he estimates he's had a stable, even mood for no more than a couple of months at a stretch; the fluctuations have caused ongoing friction at work and in his marriage, though he's never sought treatment before now.",
        "Numerous periods of elevated-mood symptoms that don't meet full criteria for a manic or hypomanic episode, alternating with numerous periods of depressive symptoms that don't meet full criteria for a major depressive episode, present for at least two years, with symptomatic periods covering at least half that time and no symptom-free interval longer than two months."
      ],
      teach:"This is essentially a chronic, attenuated form of bipolar spectrum illness — the mood swings never reach full episode criteria but persist with minimal symptom-free time for at least two years, carrying meaningful risk of later progression to a full bipolar disorder."
    },
    {
      id:"easy-selective-mutism", date:"2026-05-27", answer:"Selective Mutism",
      accept:["selective mutism"],
      clues:[
        "A 6-year-old girl's parents bring her in because her kindergarten teacher says she hasn't spoken a single word at school in the four months since classes began.",
        "At home she's talkative and affectionate, chattering constantly with her parents and older brother and cracking jokes, with no delay in her speech or language development.",
        "At school she communicates only by pointing or nodding and freezes completely if a teacher asks her to speak; the same thing happens at her grandmother's house and at a friend's birthday party — anywhere outside her immediate home.",
        "A speech-language evaluation finds completely normal language skills and articulation; the pattern has been consistent since the first day of school and is now interfering with her ability to make friends and participate in class.",
        "Consistent failure to speak in specific social situations where speaking is expected, despite speaking normally in other situations, present for more than a month and not limited to the first month of school, interfering with social and academic functioning, and not attributable to a lack of knowledge of or comfort with the spoken language required."
      ],
      teach:"The hallmark is a striking discrepancy between fluent speech in comfortable settings and consistent muteness in specific social settings, rather than a global speech or language impairment — it's classified as an anxiety-related disorder, not a communication disorder."
    },
    {
      id:"easy-trichotillomania", date:"2026-05-28", answer:"Trichotillomania (Hair-Pulling Disorder)",
      accept:["trichotillomania","hair-pulling disorder","hair pulling disorder"],
      clues:[
        "A 16-year-old girl is brought in by her mother, who noticed a thinning patch on her daughter's scalp that she's been covering with a hat.",
        "With gentle questioning, the teen admits she pulls hair from her scalp, usually while doing homework or watching TV, especially when she's stressed before exams.",
        "She describes a building tension right before pulling and a sense of relief afterward; she's tried to stop several times on her own and feels embarrassed enough to actively hide the bald patch from friends.",
        "A dermatology exam confirms patchy hair loss with hairs of noticeably varying lengths and no sign of scalp disease; she denies any skin-picking, and there's no medical explanation for the hair loss.",
        "Recurrent pulling out of one's own hair resulting in noticeable hair loss, with repeated attempts to decrease or stop the behavior, causing clinically significant distress, and not better explained by another mental disorder or medical condition."
      ],
      teach:"This disorder belongs to the obsessive-compulsive and related disorders in DSM-5, characterized by a tension-relief cycle around hair pulling. Dermatologic exam findings — hairs of varying lengths, irregular patches, no scalp disease — help rule out primary hair-loss conditions like alopecia areata."
    },
    {
      id:"easy-ptsd-dissoc", date:"2026-05-29", answer:"Post-Traumatic Stress Disorder, With Dissociative Symptoms",
      accept:["ptsd with dissociative symptoms","post-traumatic stress disorder with dissociative symptoms","ptsd","dissociative subtype of ptsd"],
      clues:[
        "A 40-year-old combat veteran comes to the VA two years after his last deployment because his wife is worried he \"checks out\" during arguments and doesn't remember parts of conversations.",
        "Since a firefight in which his unit took casualties, he's had intrusive memories and nightmares of the event, avoids news coverage of the war, and startles violently at loud noises; he's also grown emotionally numb and distant from friends and family.",
        "He describes recurring episodes, several times a week, where he suddenly feels like he's watching himself from outside his body, or like the room around him \"isn't real, like a movie set\" — experiences distinct from, and layered on top of, his flashbacks and avoidance.",
        "These out-of-body and unreality experiences aren't caused by substance use, confirmed by a clean tox screen and history, or another medical condition, and they occur alongside a trauma symptom picture that's persisted for more than a year and significantly impaired his marriage and work.",
        "Persistent intrusive re-experiencing, avoidance, negative alterations in mood and cognition, and marked arousal symptoms following exposure to actual or threatened death, together with the additional, persistent or recurrent experience of feeling detached from one's own mental processes or body, and of the surrounding world as unreal or dreamlike."
      ],
      teach:"This dissociative subtype adds depersonalization or derealization on top of the standard trauma symptom clusters and is associated with a distinct neurobiological profile. It should be distinguished from psychotic phenomena — the patient retains full reality testing about the unreal quality of the experience."
    },
    {
      id:"easy-acute-stress", date:"2026-05-30", answer:"Acute Stress Disorder",
      accept:["acute stress disorder"],
      clues:[
        "A 26-year-old woman comes in 10 days after a serious car accident in which she was trapped in the vehicle for 20 minutes before being rescued; she's missed a full week of work since.",
        "She has intrusive, distressing memories of the crash and avoids driving or even riding as a passenger; she startles at sudden braking sounds and has been sleeping poorly since the accident.",
        "She also describes the days since the crash as \"foggy\" and hard to recall clearly, and at times during the interview she seems distant, saying the accident \"still doesn't feel real, like it happened to someone else.\"",
        "Her symptoms began within days of the crash and have been present for just over a week; she has no prior trauma history or psychiatric diagnoses and recognizes these reactions started right after the accident.",
        "Nine or more symptoms spanning intrusion, negative mood, dissociation, avoidance, and arousal, developing within days of exposure to actual or threatened death, lasting from three days up to one month following the trauma, and causing clinically significant distress or impairment."
      ],
      teach:"This diagnosis shares nearly the same symptom clusters as PTSD but is defined by its narrow time window — three days to one month post-trauma. If symptoms persist beyond a month, the diagnosis is reconsidered."
    },
    {
      id:"easy-rad", date:"2026-05-31", answer:"Reactive Attachment Disorder",
      accept:["reactive attachment disorder","rad"],
      clues:[
        "A 4-year-old boy is brought to a pediatric clinic by his foster mother of six months; he was removed from his biological home at age 2 for severe neglect and spent over a year in a crowded group foster placement before this one.",
        "His foster mother says he rarely seeks her out for comfort even when hurt or scared — when he scraped his knee last week, he didn't cry out to her or seek soothing, just sat quietly by himself.",
        "He shows minimal positive affect during play, and even during pleasant moments like reading together he seems flat and doesn't reach for closeness; on the rare occasion she does comfort him, he doesn't seem to relax into it.",
        "There have also been unexplained episodes of irritability, sadness, or fearfulness even during calm, safe moments with his foster mother; this pattern has been consistent since he arrived in her care, clearly tied to a history of inconsistent, neglectful early caregiving that left him little chance to form a stable attachment.",
        "A consistent pattern of inhibited, emotionally withdrawn behavior toward caregivers — rarely seeking or responding to comfort when distressed — together with persistently limited positive affect and unexplained irritability, fearfulness, or sadness even during nonthreatening interactions, emerging before age 5 and clearly attributable to a documented history of grossly insufficient care with limited opportunity to form selective attachments."
      ],
      teach:"This reflects an internalizing pattern — withdrawn, minimal affect — tied to a documented history of grossly inadequate caregiving, in contrast to the externalizing, indiscriminately social presentation that can arise from a similar caregiving history."
    },
    {
      id:"easy-dsed", date:"2026-06-01", answer:"Disinhibited Social Engagement Disorder",
      accept:["disinhibited social engagement disorder","dsed"],
      clues:[
        "A 5-year-old girl's adoptive parents bring her in, two years after bringing her home from an orphanage abroad, worried about her behavior around strangers.",
        "At the grocery store or park, she'll walk right up to unfamiliar adults, climb into their lap, or wander off holding a stranger's hand without a second glance back at her parents.",
        "She shows no wariness approaching, or being approached by, adults she's never met — at a recent birthday party she left with an unfamiliar parent to \"see their car\" without any hesitation or checking back.",
        "This isn't limited to one setting: teachers report the same over-familiarity with substitute teachers and school visitors. Her parents confirm she spent her first three years in an under-staffed orphanage with rotating, inconsistent caregivers before her adoption.",
        "A pattern of actively approaching and interacting with unfamiliar adults, marked by reduced or absent reticence, willingness to go off with an unfamiliar adult with minimal or no hesitation, and diminished or absent checking back with a caregiver, occurring across multiple contexts and associated with a documented history of grossly insufficient early care."
      ],
      teach:"This can arise from the same history of institutional or neglectful early care as reactive attachment disorder but looks behaviorally opposite — indiscriminate, disinhibited approach toward strangers rather than withdrawal — and notably can persist even after placement in a stable, loving home."
    },
    {
      id:"easy-adhd-hyperactive", date:"2026-06-02", answer:"ADHD, Predominantly Hyperactive-Impulsive Presentation",
      accept:["adhd, predominantly hyperactive-impulsive presentation","adhd hyperactive-impulsive","adhd","attention-deficit/hyperactivity disorder"],
      clues:[
        "A 7-year-old boy's second-grade teacher requests an evaluation because he \"can't stay in his seat\" and is disrupting the classroom daily.",
        "He fidgets constantly, gets up and wanders the room during lessons, and often blurts out answers before questions are finished; at home he climbs on furniture and seems to be \"driven by a motor,\" per his parents.",
        "He interrupts conversations and games and has trouble waiting his turn in line or during board games; notably, he can sit and focus for long stretches on a puzzle he enjoys, and his parents say his attention to detail on preferred tasks is fine.",
        "This has been going on since preschool, well before age 12, happens both at school and at home, and is clearly impairing his friendships and classroom performance; there's no significant trouble reported with organization, forgetfulness, or careless mistakes.",
        "Six or more symptoms of hyperactivity and impulsivity — including fidgeting, leaving his seat inappropriately, excessive talking, blurting answers, and difficulty waiting his turn — present for at least six months, appearing before age 12, occurring in two or more settings, and causing clear functional impairment, without a comparable number of inattentive symptoms."
      ],
      teach:"This presentation is diagnosed when hyperactive/impulsive symptoms are prominent but inattentive symptoms don't reach threshold — common in younger children, since hyperactivity often precedes attention problems developmentally."
    },
    {
      id:"easy-adhd-combined", date:"2026-06-03", answer:"ADHD, Combined Presentation",
      accept:["adhd, combined presentation","adhd combined presentation","adhd","attention-deficit/hyperactivity disorder"],
      clues:[
        "A 10-year-old girl's parents and teacher both raise concerns after a rocky start to the school year — \"she just can't seem to keep it together, in every sense.\"",
        "In class she loses homework and school supplies constantly, seems not to listen when spoken to directly, and makes careless mistakes on work she clearly knows how to do; she also can't stay seated, fidgets nonstop, and often blurts out during discussions.",
        "At home she jumps from one activity to another without finishing, avoids tasks requiring sustained mental effort like reading assignments, and is described as \"always on the go,\" frequently interrupting her siblings.",
        "This combination of inattentive and hyperactive-impulsive behavior has been present since first grade, well before age 12, occurs consistently at home, school, and her grandmother's house, and has led to failing grades and friction with peers.",
        "Six or more symptoms of inattention — such as careless mistakes, not listening, losing items, and avoiding sustained mental effort — together with six or more symptoms of hyperactivity-impulsivity — such as fidgeting, difficulty remaining seated, excessive talking, and interrupting — present for at least six months, appearing before age 12, occurring across multiple settings, and causing clear functional impairment."
      ],
      teach:"This presentation requires full threshold symptoms in both inattentive and hyperactive-impulsive domains. Girls are more likely to present with inattentive symptoms that can be overlooked, but this case shows a clear combined picture across multiple settings."
    },
    {
      id:"easy-autism", date:"2026-06-04", answer:"Autism Spectrum Disorder",
      accept:["autism spectrum disorder","autism","asd"],
      clues:[
        "An 8-year-old girl's parents bring her in after her third-grade teacher raised concerns, noting she's \"quiet and well-behaved\" but seems to struggle silently with peers — concerns had been missed for years partly because she never caused classroom disruptions.",
        "She has always had narrow, intense interests — currently an encyclopedic knowledge of horse breeds she'll discuss at length regardless of whether the listener is interested — and strict routines; any change to her school schedule causes visible distress.",
        "Socially, she's learned to mimic classmates' expressions and hover near friend groups at recess, but up close she has real trouble reading unspoken social cues, doesn't reliably make eye contact, and finds back-and-forth conversation exhausting, telling her mother she \"has to act like everyone else.\"",
        "She's also sensitive to loud noises and certain fabric textures, refusing several types of clothing, and lines up her toys in precise order rather than using them for pretend play; her parents recall these traits going back to toddlerhood, though her quiet, compliant demeanor kept her under the radar longer than a more visibly disruptive child.",
        "Persistent deficits in social-emotional reciprocity, nonverbal communicative behaviors, and developing and maintaining relationships, together with restricted, repetitive patterns of behavior or interests — such as insistence on sameness, highly restricted fixated interests, and unusual reactivity to sensory input — present since early childhood and causing significant impairment, not better explained by intellectual disability alone."
      ],
      teach:"Autism in girls is frequently underdiagnosed or diagnosed later because many learn to mask — consciously imitating peers' social behavior to blend in — which can obscure the underlying deficits in reciprocity and flexible social communication that clinicians should probe for directly."
    },
    {
      id:"easy-id", date:"2026-06-05", answer:"Intellectual Disability",
      accept:["intellectual disability","intellectual developmental disorder","mental retardation"],
      clues:[
        "A 9-year-old boy is brought in for a re-evaluation before the new school year; he was first flagged as a toddler for slow developmental milestones.",
        "Formal testing places his IQ around 65, and he continues to need substantial support with reasoning and problem-solving — he's currently reading and doing math at roughly a first-grade level despite being in third grade.",
        "Day to day, he needs consistent reminders to manage his morning routine, struggles with age-appropriate money and time concepts, and has trouble navigating social situations like reading peers' intentions or following multi-step group games without support.",
        "These deficits in both reasoning ability and everyday adaptive functioning have been present since early childhood, are not explained by a hearing or vision problem, and require an individualized education plan with ongoing support at school and home.",
        "Deficits in intellectual functions such as reasoning, problem-solving, and abstract thinking, confirmed by both clinical assessment and standardized testing, together with deficits in adaptive functioning that fail to meet developmental and sociocultural standards for independence across conceptual, social, and practical domains, with onset during the developmental period."
      ],
      teach:"This diagnosis requires deficits in both intellectual functioning, confirmed by standardized testing, and adaptive functioning across conceptual, social, and practical domains — IQ score alone is never sufficient for diagnosis or for determining support needs."
    },
    {
      id:"easy-sld", date:"2026-06-06", answer:"Specific Learning Disorder",
      accept:["specific learning disorder","dyslexia","learning disability"],
      clues:[
        "An 8-year-old girl's parents request testing after two years of reading struggles despite a good school, engaged parents, and normal vision and hearing screenings.",
        "She reads far below grade level, frequently mixes up similar-looking letters, reads slowly and effortfully, and has significant trouble sounding out unfamiliar words — despite strong verbal reasoning and a good vocabulary when information is presented aloud.",
        "Her spelling is markedly poor even on words practiced repeatedly, and she's begun avoiding reading aloud in class and says she \"feels stupid,\" even though cognitive testing places her overall intellectual ability solidly in the average range.",
        "These difficulties have persisted despite an extra year of targeted reading intervention at school, began in first grade, and are clearly interfering with her academic progress; there is no intellectual disability, uncorrected sensory problem, or lack of instruction that would explain the gap.",
        "Persistent difficulties in reading accuracy, fluency, or comprehension that are substantially below what's expected for age, present for at least six months despite targeted intervention, with achievement well below age-level expectations, not better explained by intellectual disability, sensory deficits, or inadequate instruction, and with onset during school-age years."
      ],
      teach:"This diagnosis requires persistent difficulty despite adequate instruction and intervention, with achievement well below age expectations, and must rule out intellectual disability, sensory impairment, and inadequate schooling as the primary cause."
    },
    {
      id:"easy-arfid", date:"2026-06-07", answer:"Avoidant/Restrictive Food Intake Disorder",
      accept:["avoidant/restrictive food intake disorder","arfid"],
      clues:[
        "An 11-year-old boy is brought to pediatrics because he's dropped two growth-chart percentile lines for weight over the past year; his mother says he's \"always been a picky eater\" but it's gotten worse.",
        "He eats a narrow list of about six \"safe\" foods, avoiding anything with mixed textures or sauces; he says foods like tomatoes make him gag because of the texture, not because he's worried about calories or his body shape.",
        "He has no distorted view of his weight or shape, doesn't diet on purpose, and gets genuinely anxious and tearful when pushed to try new foods at school lunch, sometimes skipping lunch entirely rather than eat something unfamiliar.",
        "Growth charts and labs confirm mild malnutrition and low iron; he now relies on a nutritional shake his pediatrician prescribed, and the restriction is clearly interfering with school and family life.",
        "An eating or feeding disturbance — driven by sensory sensitivity and lack of interest rather than by concerns about weight or body shape — leading to persistent failure to meet nutritional or energy needs, evidenced by significant weight loss or faltering growth, nutritional deficiency, dependence on supplements, and marked interference with psychosocial functioning, with no evidence of a distorted body image."
      ],
      teach:"This is distinguished from anorexia nervosa by the absence of body image disturbance or fear of weight gain — the food avoidance is driven by sensory sensitivity and lack of interest in eating, not weight or shape concerns, though both can cause serious nutritional compromise."
    },
    {
      id:"easy-pica", date:"2026-06-08", answer:"Pica",
      accept:["pica"],
      clues:[
        "A 6-year-old girl is brought to her pediatrician after her mother found her eating small chunks of drywall and paint chips from her bedroom wall over the past several months.",
        "On questioning, this isn't a one-time curiosity — she regularly eats non-food items including chalk and occasionally dirt from the backyard, seemingly craving them rather than mistaking them for food.",
        "She's developmentally on track otherwise, has no autism spectrum features or intellectual disability, and doesn't do this to induce vomiting or lose weight; a lead level is sent given the paint chip exposure.",
        "The behavior has continued consistently for months, is clearly inappropriate for her developmental stage since she's well past the toddler mouthing-objects phase, and isn't part of any culturally sanctioned practice in her family.",
        "Persistent eating of nonnutritive, nonfood substances over a period of at least one month, inappropriate to the individual's developmental level, not part of a culturally supported practice, and severe enough to warrant independent clinical attention."
      ],
      teach:"Checking a lead level is essential whenever paint or soil ingestion is involved, and this behavior can co-occur with intellectual disability, autism, or pregnancy — but here it's diagnosed as a standalone condition."
    },
    {
      id:"easy-rumination", date:"2026-06-09", answer:"Rumination Disorder",
      accept:["rumination disorder"],
      clues:[
        "A pediatrician evaluates a 5-month-old girl whose mother describes her repeatedly bringing up swallowed food after most feedings for the past two months, more than typical infant reflux.",
        "On observation, the pattern isn't passive spit-up — the infant arches her back, strains, and appears to voluntarily bring food back into her mouth minutes after feeding, then chews and re-swallows or sometimes spits it out, appearing calm rather than distressed throughout.",
        "A full GI workup, including evaluation for reflux disease, pyloric stenosis, and other structural causes, is unremarkable, and there's no vomiting illness or other medical explanation found.",
        "This has occurred nearly daily for over two months, has caused her weight gain to slow on growth charts, and doesn't happen only during episodes of another feeding disorder; her overall development is otherwise appropriate for age.",
        "Repeated regurgitation of food after feeding — re-chewed, re-swallowed, or expelled — occurring over a period of at least one month, not attributable to a gastrointestinal or other medical condition, not occurring exclusively in the context of another eating disorder, and severe enough to cause faltering growth or clinical impairment."
      ],
      teach:"This is a diagnosis of exclusion once GI and structural causes like reflux disease or pyloric stenosis are ruled out; the effortful, apparently voluntary regurgitation-rechew pattern, rather than passive spit-up, is the key distinguishing feature from ordinary infant reflux."
    },
    {
      id:"easy-hypersomnolence", date:"2026-06-10", answer:"Hypersomnolence Disorder",
      accept:["hypersomnolence disorder","hypersomnia","excessive sleepiness disorder"],
      clues:[
        "A 22-year-old college student tells student health he can't stay awake through his 10am lecture no matter how early he goes to bed, and it's tanking his grades.",
        "He sleeps a full 9 to 10 hours a night yet still needs at least one long nap during the day and wakes up feeling groggy and unrefreshed, a fog that can last up to 30 minutes each morning before he feels normal.",
        "He denies any sudden muscle weakness with laughter or strong emotion and denies vivid hallucinations at sleep onset; a home sleep study rules out obstructive sleep apnea, and his roommate confirms he doesn't snore or stop breathing at night.",
        "This excessive sleepiness has occurred at least three times a week for the past four months, isn't explained by an insufficient sleep schedule since he already sleeps generously, substance use, or another medical or psychiatric condition, and is clearly impacting his coursework and social life.",
        "Excessive sleepiness despite a main sleep period of at least seven hours, accompanied by recurrent lapses into sleep or naps within the same day, unrefreshing sleep of long duration, or difficulty being fully awake after abrupt awakening, occurring at least three times per week for at least three months, with no evidence of cataplexy, sleep-related breathing disorder, or other cause, and causing significant distress or impairment."
      ],
      teach:"This diagnosis requires ruling out sleep apnea, narcolepsy (no cataplexy or REM-related hallucinations here), and insufficient sleep syndrome — the sleepiness persists despite an already generous sleep duration."
    },
    {
      id:"easy-narcolepsy", date:"2026-06-11", answer:"Narcolepsy",
      accept:["narcolepsy"],
      clues:[
        "A 17-year-old boy's parents bring him in after his soccer coach reported him \"falling asleep standing up\" during a huddle — he's also been falling asleep in class daily for the past several months.",
        "He describes irresistible urges to sleep multiple times a day nearly every day, plus vivid, dream-like experiences right as he's falling asleep or waking up, and occasionally a strange paralysis for a few seconds right after waking, unable to move.",
        "More striking to his parents: a few times when he laughed hard at a joke, his knees suddenly buckled and his head drooped for several seconds while he stayed fully aware — episodes that resolved on their own and left him embarrassed.",
        "A sleep study followed by a multiple sleep latency test shows he falls asleep unusually fast and drops into REM sleep abnormally quickly during naps; there's no evidence of sleep apnea or other cause, and this pattern has occurred at least three times weekly for over three months.",
        "Recurrent, irresistible episodes of falling asleep or lapsing into sleep occurring at least three times per week over the past three months, together with episodes of sudden bilateral loss of muscle tone triggered by laughter or strong emotion while remaining conscious, and objective sleep-study evidence of abnormally short sleep latency and rapid transition into REM sleep."
      ],
      teach:"Sudden, emotion-triggered loss of muscle tone with preserved consciousness is the most specific clinical clue here, and combined with a short sleep latency and abnormally rapid REM onset on a multiple sleep latency test, it confirms the diagnosis."
    },
    {
      id:"easy-nightmare", date:"2026-06-12", answer:"Nightmare Disorder",
      accept:["nightmare disorder"],
      clues:[
        "A 35-year-old man says he dreads going to bed because he \"always\" has a bad dream that wakes him up, a pattern going on for months since a stressful work project ended, with no actual traumatic event involved.",
        "Several nights a week he's jolted awake from long, elaborate, disturbing dreams — being chased, falling, losing loved ones — and immediately upon waking he can recall the dream in vivid detail.",
        "Once awake he's alert and oriented almost right away, able to describe the dream coherently to his wife, though it takes him a while to fall back asleep afterward because he feels shaken and anxious.",
        "This has happened three to four nights a week for the past four months, is starting to make him anxious about bedtime itself, and is affecting his energy and mood the next day; there's no trauma history, no sleepwalking during the events, and no substance or medication cause identified.",
        "Repeated occurrences of extended, extremely dysphoric, well-remembered dreams that usually involve threats to survival or security, occurring predominantly in the second half of the sleep period, with rapid orientation and alertness on awakening, causing clinically significant distress or impairment, and not attributable to a substance or another medical or mental condition."
      ],
      teach:"This differs from PTSD-related nightmares in that it isn't tied to a specific trauma, and from sleep terrors or sleepwalking in that the person wakes rapidly, is fully alert, and clearly recalls detailed dream content."
    },
    {
      id:"easy-stimulant-ud", date:"2026-06-13", answer:"Stimulant Use Disorder",
      accept:["stimulant use disorder","methamphetamine use disorder","amphetamine use disorder","stimulant addiction"],
      clues:[
        "A 34-year-old man presents at his sister's urging, admitting his methamphetamine use has \"gotten out of control\" over the past year and he's worried about losing his job.",
        "He's tried to cut back several times on his own but keeps relapsing within days; he now uses most days, well beyond the amount he originally intended when he starts a binge.",
        "He's spent so much time obtaining and using the drug, and recovering from binges, that he missed his niece's graduation and let his apartment fall into disarray; he also needs noticeably more of the drug now than a year ago to get the same effect, and reports intense cravings, especially when driving past a certain gas station where he used to buy it.",
        "He's continued using despite it costing him a relationship and a formal warning at work, and despite knowing it's worsening his anxiety and insomnia; when he tried to stop for three days recently he felt exhausted, depressed, and intensely craved the drug, though he denies any hallucinations during that stretch.",
        "A problematic pattern of stimulant use leading to clinically significant impairment, evidenced by using in larger amounts or over a longer period than intended, unsuccessful efforts to cut down, great time spent obtaining, using, or recovering from the drug, craving, tolerance, continued use despite social and occupational consequences, and continued use despite knowledge of worsening psychological problems, occurring within a 12-month period."
      ],
      teach:"This is diagnosed using the same 11-criterion framework as other substance use disorders — impaired control, social impairment, risky use, and pharmacological criteria — with severity graded by how many criteria are met within a 12-month period."
    },
    {
      id:"easy-somatic", date:"2026-06-14", answer:"Somatic Symptom Disorder",
      accept:["somatic symptom disorder","ssd"],
      clues:[
        "A 44-year-old woman presents to a new primary care doctor with a thick folder of records — she's seen eight specialists over three years for chronic pain and fatigue that never quite gets a clean diagnosis.",
        "Her main complaints are widespread joint pain, persistent fatigue, and intermittent GI upset; each has been medically evaluated more than once, with mild, nonspecific findings that don't fully explain the severity of what she describes.",
        "She spends significant time each day researching her symptoms, has stopped several hobbies out of fear of \"making things worse,\" and calls her doctor's office multiple times a week convinced something serious is being missed, despite reassurance.",
        "These symptoms and the distress and preoccupation around them have persisted for over two years, disrupt her ability to work part-time, and continue at a high level of health-related anxiety even though repeated workups have found nothing life-threatening — she isn't fabricating anything and genuinely experiences the pain and fatigue as real and severe.",
        "One or more distressing bodily symptoms that disrupt daily life, accompanied by excessive thoughts, feelings, or behaviors related to the symptoms — such as disproportionate and persistent concern about their seriousness, a high level of health-related anxiety, or excessive time and energy devoted to the symptoms or health concerns — persistently present for more than six months."
      ],
      teach:"This diagnosis doesn't require symptoms to be medically unexplained — what defines it is the disproportionate thoughts, feelings, and behaviors around real or perceived physical symptoms, distinguishing it from factitious disorder (no deception) and malingering (no external incentive)."
    },
    {
      id:"easy-illness-anxiety", date:"2026-06-15", answer:"Illness Anxiety Disorder",
      accept:["illness anxiety disorder","hypochondriasis"],
      clues:[
        "A 29-year-old man presents alone, saying he's \"pretty sure\" something is seriously wrong with him, though he admits he currently feels physically fine.",
        "For the past year he's been preoccupied with the idea that he has an undiagnosed serious illness, most recently a neurological disease after reading about a celebrity's diagnosis, despite a completely normal physical exam and labs six months ago.",
        "He checks his body for new symptoms multiple times a day — testing his grip strength, watching for muscle twitches — and has already seen two specialists this year who found nothing; a friend's reassurance calms him for only a few hours before the worry returns.",
        "He has almost no actual physical symptoms to report — his anxiety is about the possibility of illness rather than any bothersome bodily complaint — and this fear has led him to avoid the gym for fear of \"revealing weakness,\" causing real disruption to his routine and relationships for about a year now.",
        "Preoccupation with having or acquiring a serious, undiagnosed illness, with somatic symptoms absent or only mild in intensity, accompanied by a high level of anxiety about health and being easily alarmed by personal health status, along with excessive health-related behaviors or maladaptive avoidance, persisting for at least six months despite appropriate medical evaluation and reassurance."
      ],
      teach:"This is distinguished from somatic symptom disorder by having minimal or absent physical symptoms — the pathology is centered on anxious preoccupation with illness itself, and cases are further split into care-seeking and care-avoidant subtypes."
    },
    {
      id:"easy-did", date:"2026-07-17", answer:"Dissociative Identity Disorder",
      accept:["dissociative identity disorder","did","multiple personality disorder","split personality"],
      clues:[
        "A 29-year-old office manager comes in at her employer's request after two incidents where coworkers say she acted \"like a completely different person\" — different voice, different handwriting — and she has no memory of it afterward.",
        "She describes finding notes in handwriting that isn't hers, clothes in her closet she doesn't remember buying, and \"losing hours\" several times a month, a pattern going back to her teenage years.",
        "Partway through the intake, her posture, vocabulary, and tone shift abruptly and unmistakably — for a few minutes she introduces herself with a different name, has no knowledge of the conversation so far, then \"comes back\" looking confused.",
        "She has a documented history of severe, chronic childhood abuse. Coworkers describe at least two other distinct \"versions\" of her, with different mannerisms, ages, and even a claimed left-handedness versus her natural right-handedness.",
        "Two or more distinct identity states, each with its own way of relating to and perceiving the world, disrupt her sense of self, alongside recurrent gaps in recalling everyday events and personal history that go well beyond ordinary forgetfulness — causing real distress, with no substance use, medical cause, cultural or religious practice, or childhood imaginative play that would better explain it."
      ],
      teach:"Distinguish from psychotic disorders — there are no hallucinations or delusions, just distinct identity states and dissociative amnesia — and note the strong link to severe early childhood trauma."
    },
    {
      id:"easy-gender-dysphoria", date:"2026-07-18", answer:"Gender Dysphoria",
      accept:["gender dysphoria","gender identity disorder","gd"],
      clues:[
        "A 15-year-old, brought in by a supportive parent, says they've felt \"like something's just wrong with my body\" for as long as they can remember, and it's gotten harder to ignore since puberty started.",
        "Assigned male at birth, they say they've always felt like a girl inside, use she/her pronouns with close friends, and feel a wave of dread every time they notice their voice deepening or facial hair coming in.",
        "They describe wanting to hide the physical changes of puberty, wishing they'd been born with a female body, and feeling most like themselves when using a girl's name and clothing — consistent for well over a year, not something that comes and goes.",
        "The distress is significant: they've become withdrawn at school, dread gym class and locker rooms, and say they'd give anything to be seen and treated as the girl they know themselves to be. Mood is otherwise stable, and they have good insight and support at home.",
        "For at least six months, there's been a marked incongruence between their experienced gender and their sex assigned at birth, shown by several features — discomfort with their developing sex characteristics, a strong desire to be rid of those characteristics, a strong desire for the characteristics of another gender, and a strong conviction of having the feelings and reactions typical of another gender — all producing clinically significant distress."
      ],
      teach:"The diagnosis captures distress tied to incongruence between experienced and assigned gender, not gender diversity itself — identity alone isn't pathological, but persistent, clinically significant distress meets criteria."
    },
    {
      id:"easy-odd", date:"2026-07-19", answer:"Oppositional Defiant Disorder",
      accept:["oppositional defiant disorder","odd"],
      clues:[
        "An 8-year-old is brought in by his parents after his second call home from school this month — his teacher says he \"never lets anything go\" and turns nearly every request into a fight.",
        "At home, he loses his temper several times a week over small things, like being asked to turn off the TV, and often seems touchy and easily annoyed even before anything has happened.",
        "He frequently argues with parents and teachers over rules, refuses reasonable requests, and seems to deliberately push his younger sister's buttons just to get a reaction.",
        "When he gets in trouble, he almost always blames someone else first, and his parents describe him as spiteful at times — twice in the past few months he's intentionally broken a sibling's toy after feeling slighted. This has been steady for over a year, at home and at school.",
        "For at least six months, he's shown a pattern of angry, irritable mood along with argumentative, defiant behavior toward authority figures — losing his temper, being easily annoyed, arguing with adults, refusing to follow rules, deliberately annoying others, and blaming others for his own mistakes — occurring with people other than a sibling and causing real problems at home and school."
      ],
      teach:"Distinguish from conduct disorder — there's no serious rule-breaking, aggression toward people or animals, property destruction, or theft here, just a persistent pattern of anger, argumentativeness, and vindictiveness."
    },
    {
      id:"easy-ied", date:"2026-07-20", answer:"Intermittent Explosive Disorder",
      accept:["intermittent explosive disorder","ied"],
      clues:[
        "A 42-year-old warehouse supervisor is referred for evaluation after his second road-rage incident this year, the most recent involving him kicking off another driver's side mirror after being cut off in traffic.",
        "He says the outbursts come on fast, almost without warning, and are \"way bigger\" than whatever triggered them; afterward he feels embarrassed and can't fully explain his own reaction.",
        "At home, his wife describes him punching holes in drywall or throwing dishes several times a month over minor annoyances, like a late delivery or a dish left in the sink.",
        "He denies planning any of it — it's always impulsive, driven by anger rather than any goal like intimidating someone for money or revenge. He's not manic, not using substances, and has no other diagnosis that would explain the pattern; he's mortified by the damage and wants help.",
        "He has recurrent outbursts reflecting a failure to control aggressive impulses — verbal or physical aggression occurring, on average, at least twice weekly for three months, alongside a few more severe episodes involving damage to property — each grossly out of proportion to the trigger, impulsive rather than premeditated, and not better explained by another condition or substance."
      ],
      teach:"The key features are impulsivity and lack of premeditation — outbursts are reactive and disproportionate, unlike the goal-directed aggression typical of antisocial personality disorder."
    },
    {
      id:"easy-kleptomania", date:"2026-07-21", answer:"Kleptomania",
      accept:["kleptomania"],
      clues:[
        "A 51-year-old woman is referred after being caught shoplifting an inexpensive scarf from a department store — the same store where, ten minutes earlier, she'd paid full price for a $400 coat.",
        "She's mortified and confused by her own behavior; she has a stable income and says she didn't even want the scarf. This is actually her fourth similar incident in two years, each time taking something small she never uses.",
        "She describes a rising tension in the moments before she takes something, almost a physical restlessness, followed by a rush of relief the instant the item is in her pocket, even though she knows it's wrong.",
        "She's not angry at anyone and isn't trying to get back at a store or a person; nothing about it is political or symbolic to her. She has no other legal history, and there's no indication of any break with reality — no voices telling her to do it.",
        "She repeatedly fails to resist urges to take objects she doesn't need for personal use or their monetary value, feeling mounting tension right before each theft and pleasure or relief once it's done — the behavior isn't an expression of anger or revenge, isn't a response to a delusion or hallucination, and isn't better explained by a conduct problem or antisocial pattern."
      ],
      teach:"Distinguishes from ordinary theft via the tension-relief cycle and the fact that stolen items aren't wanted or needed — it's an impulse-control disorder, not one motivated by gain, anger, or delusion."
    },
    {
      id:"easy-pyromania", date:"2026-07-22", answer:"Pyromania",
      accept:["pyromania"],
      clues:[
        "A 14-year-old is brought to evaluation by his parents after firefighters were called to a small brush fire behind their house — the third fire connected to him in the past eight months.",
        "He's not doing it for money or attention online, and he wasn't trying to hurt anyone or get back at a classmate; he says he just \"really likes watching fire\" and finds himself drawn to matches, lighters, and fire trucks.",
        "In the days before setting a fire, he describes a build-up of tension or restlessness that only eases once the fire is lit; watching it burn, and later lingering near firefighters at the scene, gives him a genuine rush of satisfaction.",
        "He denies any anger at his family or school, isn't manic or psychotic, and there's no financial motive — his parents confirm he's never tried to collect insurance money or damage a rival's property. He knows it's dangerous and wrong but says the pull is hard to resist.",
        "On more than one occasion, he's deliberately and purposefully set fires, with tension or emotional arousal beforehand and a fascination with fire and its surrounding context — sirens, equipment, the aftermath — followed by pleasure or relief when setting or witnessing the fire; the behavior isn't for profit, to express anger or ideology, to improve his circumstances, or in response to a delusion, and isn't better explained by a conduct problem or antisocial pattern."
      ],
      teach:"Distinguish from conduct-disorder fire-setting, which is often for material gain, vandalism, or attention — here the core feature is fascination with, and emotional relief from, fire itself."
    },
    {
      id:"easy-major-ncd", date:"2026-07-23", answer:"Major Neurocognitive Disorder (Dementia)",
      accept:["major neurocognitive disorder","dementia","major neurocognitive disorder (dementia)","major ncd"],
      clues:[
        "A 78-year-old retired teacher is brought in by her daughter, who says her mother has become \"a completely different person\" over the past two years — she's stopped paying bills on time and got lost driving to a store she's visited for decades.",
        "Formal testing shows a clear decline from her prior baseline in memory and complex attention; she repeats questions within minutes and can no longer follow a recipe she's made for thirty years.",
        "Her daughter has taken over her mother's medications and finances entirely, because her mother now sets out the wrong pills or forgets to pay rent — tasks she can no longer manage even with reminders.",
        "There's no evidence of delirium — this has developed gradually over roughly two years, and it isn't better explained by depression (her mood is stable) or another psychiatric condition; a medical workup has ruled out reversible causes.",
        "Testing and history confirm a significant decline from her previous level of functioning in memory and at least one other cognitive domain, substantial enough that she now needs help with complex everyday tasks like managing money and medications — she can no longer live fully independently — and this isn't occurring only during a period of acute confusion, nor better explained by another mental disorder."
      ],
      teach:"The defining line versus its milder counterpart is loss of independence — she now needs help with instrumental activities like finances and medications, not just extra effort to manage them."
    },
    {
      id:"easy-mild-ncd", date:"2026-07-24", answer:"Mild Neurocognitive Disorder",
      accept:["mild neurocognitive disorder","mild cognitive impairment","mci","mild ncd"],
      clues:[
        "A 67-year-old retired accountant comes in on his own initiative, worried because he's noticed himself misplacing words in conversation and needing extra time to balance his checkbook — something that used to be effortless.",
        "His wife agrees something's changed over the past year: he double-checks appointments more, occasionally forgets a name he'd normally know instantly, and reads instructions twice where before he'd skim them once.",
        "Neuropsychological testing shows a mild but measurable decline compared to what would be expected given his education and prior performance, mainly in memory and processing speed — modest, not dramatic.",
        "Crucially, he still manages his finances, cooks, drives safely, and lives fully independently — he's just relying more on lists, reminders, and extra effort to compensate. There's no evidence of delirium, and his mood and psychiatric history don't explain the pattern.",
        "History and testing show a modest decline from his previous level of functioning in one or more cognitive domains, noticed by both him and his wife and confirmed on formal testing — but the deficits don't interfere with his ability to live independently, even though he now needs more effort, compensatory strategies, or accommodation to manage daily tasks, and this isn't occurring only during a period of acute confusion or better explained by another mental disorder."
      ],
      teach:"Cognitive decline is present and measurable, but independence in daily life is preserved — the key differentiator from its more severe counterpart, and a state that doesn't always progress further."
    },
    {
      id:"easy-bpd", date:"2026-07-25", answer:"Borderline Personality Disorder",
      accept:["borderline personality disorder","bpd"],
      clues:[
        "A 24-year-old graduate student comes to the ER after cutting her forearm following a breakup text from someone she'd been dating for three weeks but already called \"the love of my life.\"",
        "She describes a pattern going back to her teens: intense, short-lived relationships where she swings between idolizing new friends or partners and then feeling suddenly furious and betrayed by them over minor slights.",
        "She says she often doesn't know who she really is — her goals, values, even her taste in music shift depending on who she's dating — and describes a persistent, hollow feeling of emptiness that's hard to shake.",
        "She's impulsive with spending and driving recklessly when upset, has had several past episodes of cutting or suicidal gestures tied to feeling abandoned, and her mood can swing dramatically within a single day in reaction to what's happening around her. She goes to great lengths to avoid people leaving her, real or imagined.",
        "She shows a longstanding pattern, present since early adulthood, of unstable relationships marked by swinging between idealizing and devaluing others, an unstable sense of self, frantic efforts to avoid real or imagined abandonment, impulsivity in at least two potentially damaging areas, recurrent self-harm or suicidal gestures, marked mood reactivity, chronic emptiness, and intense difficulty controlling anger."
      ],
      teach:"Differentiate from bipolar disorder — mood shifts here are rapid, reactive, and tied to interpersonal triggers (hours, not sustained days-long episodes), and the core features are unstable relationships, self-image, and impulsivity."
    },
    {
      id:"easy-npd", date:"2026-07-26", answer:"Narcissistic Personality Disorder",
      accept:["narcissistic personality disorder","npd"],
      clues:[
        "A 45-year-old sales executive is referred by HR after a blow-up in a team meeting where he called a colleague's project \"beneath someone of my caliber\" and demanded a public apology for being \"disrespected.\"",
        "He describes himself as simply more talented than most of his coworkers, says he deserves the corner office and the biggest accounts without question, and seems genuinely puzzled that anyone would find this off-putting.",
        "He frequently name-drops executives he golfs with, insists on being served first at team lunches, and expects colleagues to drop their own work whenever he needs something, with little acknowledgment of the extra burden this creates for them.",
        "When a junior colleague described feeling overwhelmed after he'd unloaded a project on her, he dismissed her feelings and pivoted immediately to how the situation was inconveniencing him. He assumes coworkers are jealous of his success, and gets irritated but not devastated when he doesn't get special treatment.",
        "Since early adulthood and across many contexts, he's shown a pervasive pattern of grandiosity, need for admiration, and lack of empathy — including a grandiose sense of self-importance, preoccupation with fantasies of unlimited success, a belief that he's special and should only associate with other high-status people, a need for excessive admiration, a sense of entitlement, exploiting others for his own ends, a lack of empathy for others' feelings, and arrogant, haughty attitudes and behavior."
      ],
      teach:"The grandiosity is pervasive and inflexible across contexts, not situational confidence — note that fragile self-esteem and sensitivity to criticism often underlie the outward grandiosity, even in cases, like this one, that present as thick-skinned entitlement."
    },
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
    },
    {
      id:"med-mdd-peripartum", date:"2026-06-29", answer:"Major Depressive Disorder, With Peripartum Onset",
      accept:["major depressive disorder with peripartum onset","mdd with peripartum onset","postpartum depression","peripartum depression","postpartum depression mdd"],
      clues:[
        "A 31-year-old comes in six weeks after delivering her first child, brought by her husband who says \"this isn't just being tired.\"",
        "She describes persistent low mood, tearfulness, and overwhelming guilt about not \"bonding\" the way she expected to. She has trouble sleeping even when the baby sleeps.",
        "She's lost interest in things she used to enjoy, eats very little, and struggles to concentrate enough to follow simple conversations. She describes feeling like a fraud as a mother.",
        "She denies any thoughts of harming the baby, though she does have passive thoughts that her family would be better off without her. There's no history of mood episodes before this pregnancy.",
        "Her husband mentions she briefly seemed almost too cheerful and energized in the first 48 hours after birth, but that quickly gave way to the current state — there's no ongoing elevated mood, just this persistent low one.",
        "Five or more depressive symptoms — including depressed mood and loss of interest — present nearly every day, with onset during pregnancy or within four weeks postpartum, causing significant impairment. No manic or hypomanic episode. Limited insight into the severity, attributing it to \"just being a new mom.\""
      ],
      teach:"The peripartum onset specifier applies when a major depressive episode begins during pregnancy or within 4 weeks postpartum (clinically, the risk window is often considered up to a year). It must be distinguished from 'baby blues' (mild, self-limited, <2 weeks) and from postpartum psychosis (a more acute, often manic-spectrum emergency)."
    },
    {
      id:"med-pica", date:"2026-06-30", answer:"Pica",
      accept:["pica"],
      clues:[
        "A 24-year-old who is 22 weeks pregnant is referred by her OB after mentioning, almost sheepishly, a craving she didn't think was a big deal.",
        "For about two months she has been regularly eating ice in large quantities, and more recently has started eating small amounts of laundry starch and clay from her garden.",
        "She knows these aren't food, has no intention of stopping, and describes a strong urge that intensifies when she's stressed. Lab work shows iron-deficiency anemia.",
        "This isn't a single odd snack — it's been persistent, deliberate consumption of these non-nutritive substances multiple times a week for over a month.",
        "Her culture has no tradition of eating clay or starch (which can be culturally sanctioned in some contexts and wouldn't itself warrant a diagnosis), and the behavior is clearly outside what's developmentally expected for an adult.",
        "Persistent eating of non-nutritive, non-food substances for at least one month, inappropriate to developmental level, not part of a culturally supported or socially normative practice, and severe enough to warrant clinical attention — can co-occur with iron or zinc deficiency, and is notably more common during pregnancy."
      ],
      teach:"Pica can occur at any age, including adulthood, and is notably associated with pregnancy and iron/zinc deficiency. The DSM-5 explicitly excludes culturally sanctioned practices (e.g., some traditional clay consumption) — context matters for the diagnosis."
    },
    {
      id:"med-brief-psychotic", date:"2026-07-01", answer:"Brief Psychotic Disorder",
      accept:["brief psychotic disorder"],
      clues:[
        "A 35-year-old is brought to the ER by her brother after two days of bizarre behavior following the sudden death of her husband one week ago.",
        "She has been telling family that the television is sending her coded messages and that she briefly saw her late husband standing in the kitchen. Her speech is tangential and hard to follow.",
        "She has no psychiatric history, no substance use on tox screen, and no medical abnormality on workup. Before this week, family describes her as sharp and entirely well.",
        "The symptoms appeared abruptly, within about 48 hours, with no preceding gradual decline — a stark, sudden break from her usual functioning.",
        "By day six she is already showing signs of returning to her baseline, with the team optimistic this will resolve well within a month given the sudden onset and clear stressor.",
        "One or more of delusions, hallucinations, or disorganized speech, with sudden onset, lasting at least one day but less than one month, with eventual full return to premorbid functioning — often triggered by a significant stressor."
      ],
      teach:"Brief psychotic disorder is defined by its short duration (1 day–1 month) and full return to baseline functioning — distinguishing it from schizophreniform disorder (up to 6 months) and schizophrenia. A clear precipitating stressor (here, sudden bereavement) is a recognized subtype specifier."
    },
    {
      id:"med-mdd-seasonal", date:"2026-07-02", answer:"Major Depressive Disorder, With Seasonal Pattern",
      accept:["major depressive disorder with seasonal pattern","seasonal affective disorder","sad seasonal","seasonal depression","mdd with seasonal pattern"],
      clues:[
        "A 39-year-old comes in for the third year in a row, every November, with what she calls \"the same old slump.\"",
        "She describes low energy, increased sleep (up to 11 hours), strong carbohydrate cravings, and weight gain that begins reliably as days shorten in the fall.",
        "By February or March each year, without any treatment, her mood and energy return to normal — and stay normal through spring and summer.",
        "This pattern has repeated for the past three winters in a row, with no depressive episodes occurring outside of the fall/winter months during that time.",
        "She denies any springtime or summertime depressive episodes in this period, and the timing has been so reliable that she now stocks up on her favorite comfort shows every October in anticipation.",
        "Major depressive episodes with onset and remission at characteristic times of year (fall/winter onset, spring remission) for at least two consecutive years, with no non-seasonal episodes during that period, and seasonal episodes substantially outnumbering any non-seasonal ones over the patient's lifetime."
      ],
      teach:"The seasonal pattern specifier requires a regular temporal relationship over at least two years, with seasonal episodes substantially outnumbering non-seasonal ones lifetime. Hypersomnia, carbohydrate craving, and weight gain (atypical features) are common in the fall/winter pattern, contrasting with classic insomnia/appetite-loss presentations."
    },
    {
      id:"med-narcolepsy", date:"2026-07-03", answer:"Narcolepsy",
      accept:["narcolepsy"],
      clues:[
        "A 20-year-old college student is referred after falling asleep in three different classes in one week, despite getting what she considers a full night's sleep.",
        "She describes irresistible sleep attacks several times a week, lasting under 15 minutes, after which she feels temporarily refreshed.",
        "Twice in the last month, she's had moments of sudden muscle weakness in her face and knees right after a friend told a joke that made her laugh hard, though she stayed fully conscious.",
        "She also describes vivid, sometimes frightening hallucinations right as she's falling asleep, and once woke up completely unable to move for almost a minute despite being fully alert.",
        "A sleep study shows she enters REM sleep abnormally quickly after falling asleep, and a follow-up daytime test captures multiple short sleep-onset REM periods.",
        "Recurrent periods of an irrepressible need to sleep or lapsing into sleep, occurring at least three times per week over three months, with episodes of cataplexy triggered by strong emotion and supportive findings on a sleep study (short REM latency, sleep-onset REM periods)."
      ],
      teach:"Cataplexy — sudden, brief loss of muscle tone triggered by strong emotion (often laughter), with preserved consciousness — is the most specific feature of narcolepsy. Hypnagogic hallucinations and sleep paralysis frequently co-occur but aren't required for diagnosis if cataplexy or supportive sleep study findings are present."
    },
    {
      id:"med-kleptomania", date:"2026-07-04", answer:"Kleptomania",
      accept:["kleptomania"],
      clues:[
        "A 42-year-old attorney is referred by her lawyer after a shoplifting arrest — the third in two years, each time for inexpensive items she didn't need and could easily afford.",
        "She describes a building tension before each theft and a wave of relief, almost euphoria, the moment the item is in her bag — followed quickly by intense shame.",
        "She doesn't plan the thefts in advance, doesn't need the items, often discards them afterward, and isn't doing it out of anger or to make a statement.",
        "She's tried to stop after each arrest, has hidden this from her family for over a decade, and is bewildered by her own behavior given that she has the means to simply buy what she takes.",
        "There's no other criminal history, no conduct disorder history, and no manic episode underway — outside of these specific incidents her judgment and functioning are entirely intact.",
        "Recurrent failure to resist impulses to steal objects not needed for personal use or monetary value, with rising tension before the act and relief or gratification during it, not committed out of anger, revenge, or in response to a delusion, and not better explained by conduct disorder or mania."
      ],
      teach:"Kleptomania is an impulse-control disorder, not a property crime motivated by need or ideology — the tension-relief cycle and theft of unneeded, often low-value items are the diagnostic core. It's frequently concealed for years out of shame, complicating detection."
    },
    {
      id:"med-rumination", date:"2026-07-05", answer:"Rumination Disorder",
      accept:["rumination disorder","rumination syndrome"],
      clues:[
        "A 26-year-old is referred after extensive GI workup found nothing wrong, despite months of effortless regurgitation after nearly every meal.",
        "He describes bringing food back up within minutes of eating, without nausea, retching, or any sign of disgust — he then either re-chews and re-swallows it or spits it out.",
        "This has been happening almost daily for about four months. He denies trying to control his weight and isn't restricting intake beforehand or purging on purpose afterward.",
        "He's lost some weight as a side effect, but says this isn't something he's doing on purpose — it just happens, often without him fully noticing until food is already back in his mouth.",
        "He has no other GI diagnosis (his endoscopy and pH study were unremarkable), and the regurgitation isn't triggered by anxiety attacks or another medical condition.",
        "Repeated regurgitation of food over at least one month — re-chewed, re-swallowed, or spit out — not attributable to a GI or other medical condition, not occurring exclusively during another eating disorder, and not part of intentional purging behavior."
      ],
      teach:"Rumination disorder can occur at any age and is often misdiagnosed as a GI condition (GERD) or bulimia. The key distinction from bulimia: regurgitation is effortless and not preceded by binge eating or followed by intentional purging — it's a learned, often unconscious motor pattern."
    },
    {
      id:"med-major-ncd", date:"2026-07-06", answer:"Major Neurocognitive Disorder (Dementia)",
      accept:["major neurocognitive disorder","major neurocognitive disorder dementia","dementia"],
      clues:[
        "A 74-year-old is brought in by his daughter, who says he got lost driving to a grocery store he's been to weekly for twenty years.",
        "Over the past two years he's had progressive decline in memory — repeating questions, forgetting recent conversations — along with new difficulty managing his finances, which his daughter has quietly taken over.",
        "He's also had trouble following multi-step recipes he used to make from memory, and recently got confused trying to use the TV remote, a device he's used for decades.",
        "The decline has been gradual, not sudden, with no fluctuating course and no recent acute illness, medication change, or infection that would point elsewhere.",
        "He's no longer able to live independently — his daughter has had to take over bill paying, medication management, and driving entirely. He has some awareness that \"things aren't right\" but minimizes how much help he now needs.",
        "Significant decline from a previous level in one or more cognitive domains (here, memory and executive function), confirmed by both report and testing, severe enough to interfere with independence in everyday activities — gradual onset and progressive course, not better explained by delirium or another mental disorder."
      ],
      teach:"Major NCD (the DSM-5 term replacing 'dementia') requires interference with independence — Mild NCD involves cognitive decline without loss of independence. Gradual onset and progressive course distinguish it from delirium (acute, fluctuating); a thorough workup should still rule out reversible causes."
    },
    {
      id:"med-mdd-anxious", date:"2026-05-17", answer:"Major Depressive Disorder, With Anxious Distress",
      accept:["major depressive disorder with anxious distress","mdd with anxious distress","depression with anxiety","mdd, anxious distress"],
      clues:[
        "A 45-year-old operations manager comes in saying he's just 'not himself' — low energy, no interest in golf or his kids' games, going on eight weeks now.",
        "He's dropped six pounds without trying, wakes at 4am most nights and can't get back to sleep, and says he feels like he's 'moving through wet cement' most of the day.",
        "Alongside the low mood he describes a near-constant tension in his chest and shoulders, and says he can't shake the sense that 'something bad is about to happen,' even though nothing specific is wrong.",
        "He denies discrete panic attacks — no sudden surges of fear with a racing heart — it's more a low simmering dread that colors everything, worse when he tries to sit still.",
        "He's had trouble concentrating at work for weeks, partly from low motivation and partly because worry keeps intruding, and he's begun avoiding meetings out of a vague fear he'll say something wrong.",
        "Five or more of a set of depressive symptoms — including depressed mood and loss of interest — have been present nearly every day for over two weeks, causing significant impairment, accompanied by at least two of: feeling keyed up or tense, unusual restlessness, difficulty concentrating due to worry, fear that something awful may happen, and a sense of potential loss of control."
      ],
      teach:"The anxious distress specifier flags a depressive episode with prominent subjective tension and worry-driven concentration problems, distinct from comorbid panic disorder — there are no discrete panic attacks here, just pervasive dread layered on the depressive syndrome. It matters clinically because anxious distress predicts poorer treatment response and higher suicide risk."
    },
    {
      id:"med-mdd", date:"2026-05-18", answer:"Major Depressive Disorder",
      accept:["major depressive disorder","mdd","clinical depression","depression"],
      clues:[
        "A 33-year-old marketing director is brought in by a worried best friend, insisting she's 'totally fine' — she's hit every deadline this quarter and hosted a dinner party last weekend.",
        "Underneath the competent exterior, she admits nothing has felt enjoyable in over two months — not her favorite show, not the new puppy, not sex with her partner — though she pushes through every obligation on schedule.",
        "She's been sleeping ten to eleven hours a night and still feels exhausted, has gained about eight pounds from stress-eating, and privately describes feeling like a fraud who's 'fooling everyone.'",
        "She denies any specific stressor — her job and relationship are both going well — which is part of why she's confused about why she feels this way and has been slow to bring it up.",
        "When asked directly, she admits to passing thoughts that everyone would be better off without the effort of dealing with her, though she has no plan or intent and has told no one until now.",
        "Five or more of the following have been present nearly every day for at least two weeks, representing a change from prior functioning: depressed mood, markedly diminished interest or pleasure in nearly all activities, significant weight or appetite change, sleep disturbance, fatigue or loss of energy, feelings of worthlessness, diminished concentration, and recurrent thoughts of death — causing clinically significant distress or impairment."
      ],
      teach:"High-functioning depression can hide behind sustained performance and social masking, which is exactly why passive suicidal ideation must be asked about directly rather than inferred from how put-together someone appears. Preserved occupational functioning does not rule out a major depressive episode if the internal symptom burden meets criteria."
    },
    {
      id:"med-bipolar1", date:"2026-05-19", answer:"Bipolar I Disorder",
      accept:["bipolar i disorder","bipolar 1","bipolar i","bipolar disorder"],
      clues:[
        "A 34-year-old boutique owner is brought to the ER by her sister, who says that what started two weeks ago as her sister being 'unusually productive' has spiraled into something alarming.",
        "For the past nine days she's slept roughly two to three hours a night and insists she doesn't need more, while launching plans for two new store locations and a clothing line she says will 'change the industry.'",
        "At first her family was almost pleased — she seemed confident, energized, and full of ideas — but the excitement soured when she maxed out three credit cards in a weekend and quit her stable day job by text message.",
        "Her sister describes her speech as nearly impossible to interrupt, jumping between topics so fast it's hard to follow, and says she seems easily distracted by anything in the room.",
        "Two nights ago she drove to a neighboring city at 2am to 'scout real estate,' and yesterday she became irritable and combative with a store clerk who questioned one of her large purchases — behavior her family says is wildly out of character.",
        "A distinct period lasting at least one week of abnormally and persistently elevated, expansive, or irritable mood along with increased goal-directed energy, with three or more of: inflated self-esteem or grandiosity, decreased need for sleep, pressured speech, flight of ideas, distractibility, increase in goal-directed activity, and excessive involvement in activities with high potential for painful consequences — severe enough to cause marked impairment in functioning."
      ],
      teach:"What can look like enviable productivity in the first few days is often the earliest, most easily missed phase of a manic episode — the giveaway is the trajectory toward impaired judgment and consequences, not just elevated energy. A full week of mania with marked functional impairment (versus the shorter, less impairing hypomania of Bipolar II) is what specifically defines Bipolar I."
    },
    {
      id:"med-gad", date:"2026-05-20", answer:"Generalized Anxiety Disorder",
      accept:["generalized anxiety disorder","gad","chronic anxiety"],
      clues:[
        "A 51-year-old warehouse supervisor has seen his primary care doctor four times this year for a rotating cast of complaints — tension headaches, an upset stomach, and a tight, achy neck that won't resolve with physical therapy.",
        "Bloodwork, a GI workup, and an MRI of his cervical spine have all come back unremarkable, which frustrates him more than it reassures him.",
        "When asked about stress, he initially says his life is 'fine,' but further questioning reveals he's been worrying almost constantly for over a year — about his job security, his adult daughter's finances, and minor home repairs — even when things are objectively going smoothly.",
        "He says he can't turn the worry off once it starts, describes feeling keyed up most days, and his wife notes he's become irritable and has trouble falling asleep because his mind 'won't shut up.'",
        "He denies discrete panic attacks and hasn't avoided any places or situations — his main complaint is the constant muscle tension and fatigue that he only later connects to the nonstop worrying.",
        "Excessive anxiety and worry about multiple events or activities, occurring more days than not for at least six months, which the person finds difficult to control, associated with three or more of: restlessness, fatigue, difficulty concentrating, irritability, muscle tension, and sleep disturbance, and causing significant distress or impairment not better explained by a medical condition."
      ],
      teach:"GAD frequently presents first in primary care as unexplained somatic complaints — muscle tension, GI upset, headaches — rather than as reported worry, especially in patients who don't identify themselves as 'anxious.' Ruling out medical causes before making the diagnosis is essential, but persistent somatic symptoms with a negative workup should prompt a direct inquiry into worry patterns."
    },
    {
      id:"med-panic", date:"2026-05-21", answer:"Panic Disorder",
      accept:["panic disorder","panic attacks"],
      clues:[
        "A 39-year-old nurse presents after several trips to the ER in the past two months, each time convinced she was having a heart attack, though every workup — EKG, troponin, chest X-ray — has been normal.",
        "The most recent episode woke her from sleep at 3am with a pounding heart, drenching sweat, and a wave of terror so intense she thought she was dying, peaking within about ten minutes.",
        "She's had four of these episodes now, two of them during the day with no clear trigger and two that woke her directly out of sleep, which she finds especially unnerving since she wasn't even anxious beforehand.",
        "Since the ER visits started, she's begun sleeping with her phone in hand 'just in case,' and has started dreading bedtime, worried another attack will hit her while she's asleep and unable to get help fast enough.",
        "She hasn't stopped going anywhere or avoided any places yet, but she's increasingly anxious between episodes about when the next one will strike, and has asked to switch to shorter shifts to be closer to a hospital.",
        "Recurrent unexpected episodes of intense fear peaking within minutes, involving four or more symptoms such as palpitations, sweating, trembling, shortness of breath, chest pain, dizziness, and fear of dying, followed by at least a month of persistent concern about additional episodes or their consequences, or significant maladaptive behavior change related to them."
      ],
      teach:"Panic attacks that wake someone from non-REM sleep — nocturnal panic — are a real and often-missed presentation that can mimic cardiac events and drive repeated ER visits; they're distinguished from nightmares by the absence of dream recall and the same autonomic surge seen in daytime attacks. The diagnosis hinges on recurrent unexpected attacks plus at least a month of anticipatory anxiety or behavior change, not the attacks alone."
    },
    {
      id:"med-agoraphobia", date:"2026-05-22", answer:"Agoraphobia",
      accept:["agoraphobia"],
      clues:[
        "A 62-year-old retired teacher hasn't been to the grocery store, a restaurant, or church in about eight months, and his wife now does essentially all the errands.",
        "It started after he had a sudden episode of severe vertigo and vomiting in a crowded supermarket that turned out to be benign paroxysmal positional vertigo, fully resolved within days — but he's refused to go back to a store since.",
        "He describes intense fear of being in large open stores, standing in checkout lines, and riding the bus, specifically because he's afraid he'll feel dizzy again in a place where it would be hard to leave quickly or get help.",
        "Notably, he's never had a racing heart, chest tightness, or the sense of impending doom that would suggest a panic attack — his fear is squarely about the vertigo recurring in an inescapable setting, not about anxiety attacks themselves.",
        "He tolerates small, familiar spaces like his own kitchen or his neighbor's porch without any distress, and only shows fear regarding two or more specific types of situations: large stores, lines and crowds, and public transportation.",
        "Marked fear or anxiety about two or more situations such as using public transportation, being in open spaces, being in enclosed places, standing in line or being in a crowd, or being outside the home alone — actively avoided or endured with intense distress, out of proportion to actual danger, lasting six months or more and causing significant impairment."
      ],
      teach:"Agoraphobia doesn't require a history of panic disorder — it can develop after any experience, medical or otherwise, that creates fear of being trapped or unable to escape or get help, as long as two or more of the defining situational categories are involved. This is a classic exam trap: many clinicians assume agoraphobia is always secondary to panic attacks, but DSM-5 recognizes it as an independent diagnosis."
    },
    {
      id:"med-sad", date:"2026-05-23", answer:"Social Anxiety Disorder",
      accept:["social anxiety disorder","social phobia","sad"],
      clues:[
        "A 29-year-old software engineer requests a note excusing him from an upcoming all-hands presentation, saying he'd rather take a demotion than speak in front of the team again.",
        "He's well-liked, has close friends, dates comfortably, and enjoys one-on-one meetings and casual office banter without any anxiety at all.",
        "The problem is narrowly about performing in front of groups — presentations, being called on in meetings, even giving a toast at his brother's wedding last year, which he got through only after two glasses of wine and still describes as 'the worst ten minutes of my life.'",
        "In those specific moments he gets a racing heart, shaky hands, and a fear that everyone will see him fumble and think he's incompetent — he's been rehearsing this upcoming presentation for three weeks and still dreads it.",
        "He's turned down two promotions specifically because they'd require more public speaking, and has started scripting even brief updates word-for-word so he doesn't freeze, all while functioning completely normally in every other social context.",
        "Marked fear or anxiety limited to performance situations — such as speaking or performing in front of others — where the person fears acting in a way that will be negatively evaluated, with the situations avoided or endured with intense anxiety, persisting six months or more and causing significant distress or impairment, out of proportion to actual threat."
      ],
      teach:"The performance-only specifier captures people whose social fear is confined to being observed while performing a task — public speaking, playing an instrument — while ordinary social interaction remains comfortable; this is a common and often career-limiting presentation that's easy to misread as mere stage fright rather than a clinical disorder."
    },
    {
      id:"med-specific-phobia", date:"2026-05-24", answer:"Specific Phobia",
      accept:["specific phobia","phobia"],
      clues:[
        "A 46-year-old accountant reschedules any outdoor commitment the moment a storm appears in the ten-day forecast, and keeps a battery-powered weather radio in every room of her house.",
        "She's not afraid of blood, needles, heights, or enclosed spaces — her fear is narrowly about thunderstorms, particularly lightning, a fear she traces back to a tree falling near her childhood home during a storm.",
        "When a storm rolls in, she moves to an interior room without windows, and reports her heart racing and hands shaking even watching storm coverage on the news from a place of safety.",
        "She's declined a promotion that would require her to travel to a region with a longer storm season, and cancels camping trips with her family every summer, which has caused friction with her kids.",
        "She recognizes the fear is excessive — she knows her house has never been struck by lightning and that she's statistically very unlikely to be harmed — but she can't stop the anticipatory dread that builds for days before predicted storms.",
        "Marked, persistent fear or anxiety about a specific object or situation — here, a naturally occurring environmental event — that is actively avoided or endured with intense distress, is out of proportion to the actual danger posed, and has lasted six months or more, causing significant distress or impairment."
      ],
      teach:"Specific phobias extend well beyond the commonly taught blood-injection-injury type; the natural environment subtype (storms, heights, water) is just as diagnostically valid and can be equally impairing, especially when anticipatory dread starts days before the triggering event ever arrives."
    },
    {
      id:"med-separation-anxiety", date:"2026-05-25", answer:"Separation Anxiety Disorder",
      accept:["separation anxiety disorder","adult separation anxiety","separation anxiety"],
      clues:[
        "A 38-year-old man is referred by his primary care doctor after mentioning, almost in passing, that he calls his wife eleven times during her workday 'just to check in.'",
        "He describes intense dread whenever she travels for work — even for a single overnight — with racing thoughts that something terrible will happen to her, or that she'll get into an accident and he won't be there.",
        "He's turned down a job offer in another city because it would mean living apart from her for the first few months, and he insists on driving her to the airport every time, waiting until her flight is confirmed to have landed before he can relax.",
        "He's had recurring nightmares about losing her, and once called in sick to work because she wasn't answering her phone for three hours and he couldn't concentrate on anything else.",
        "This isn't new — he traces a milder version of this back to his college years, when he transferred schools after one semester specifically to be closer to his parents, though it's intensified noticeably since his marriage.",
        "Developmentally inappropriate and excessive fear or anxiety about separation from an attachment figure, evidenced by persistent worry about losing them or about events causing separation, reluctance to be away from them, nightmares about separation, and physical distress when separation occurs or is anticipated — present for six months or more in an adult and causing significant impairment."
      ],
      teach:"Separation anxiety disorder is often mislabeled as purely a childhood condition, but DSM-5 explicitly allows adult onset or persistence, requiring six months of symptoms in adults versus four weeks in children; it's frequently missed because it gets folded into 'clinginess' or relationship dynamics rather than recognized as an anxiety disorder in its own right."
    },
    {
      id:"med-ptsd", date:"2026-05-26", answer:"Post-Traumatic Stress Disorder",
      accept:["post-traumatic stress disorder","ptsd","posttraumatic stress disorder"],
      clues:[
        "A 27-year-old paramedic comes in eight months after responding to a multi-car pileup where a child died despite his team's efforts, saying he 'handled it fine at the time' and only recently started struggling.",
        "For the first five months after the call he functioned normally, even received a commendation, but over the last three months he's started having vivid, intrusive images of the scene that intrude during quiet moments at work.",
        "He's begun avoiding the stretch of highway where it happened, taking a longer route to every call, and has stopped watching medical dramas he used to enjoy because they trigger the same images.",
        "He describes feeling emotionally numb around his kids lately, has become quick to anger with coworkers over minor things, and startles hard at sudden sounds, all of which is new for him and confusing given how much time has passed.",
        "He initially assumed he was just tired, but a coworker who noticed him staring blankly during a debrief encouraged him to get evaluated, and he now realizes the symptoms only really began appearing around the five-to-six month mark, well after the incident itself.",
        "Following exposure to a life-threatening event, the full symptom picture — intrusive memories, avoidance of reminders, negative changes in mood or cognition, and marked alterations in arousal and reactivity — did not emerge until more than six months after the event, though it now persists and causes significant distress or impairment."
      ],
      teach:"Delayed-onset presentations, where the full symptom picture doesn't emerge until six months or more after the trauma, are real and specified in DSM-5, even though most cases present within the first three months; an initial period of apparent resilience shouldn't be mistaken for the trauma having had no lasting impact."
    },
    {
      id:"med-adjustment", date:"2026-05-27", answer:"Adjustment Disorder",
      accept:["adjustment disorder","adjustment disorder with mixed anxiety and depressed mood"],
      clues:[
        "A 55-year-old man comes in six weeks after his divorce was finalized, saying he 'should be doing better than this' given that the marriage had been unhappy for years and the split was mutual.",
        "He describes a low, heavy mood most days along with a persistent undercurrent of worry about finances and whether he'll ever be in another relationship, both of which are new for him.",
        "He's had trouble concentrating at work and has skipped two social invitations from friends, which is out of character, though he's still managing to show up to his job and pay his bills on time.",
        "He denies anhedonia in activities unrelated to the divorce — he still enjoys his weekly basketball game and cooking — and he doesn't meet full criteria for either a depressive or anxiety syndrome when screened carefully.",
        "He's worried the feelings are excessive given the marriage wasn't good, but a friend who went through a similar divorce says he 'seems to be taking it much harder' and encouraged him to talk to someone.",
        "Emotional or behavioral symptoms, combining features of both low mood and anxiety, developing within three months of an identifiable stressor and causing distress out of proportion to what would normally be expected or marked impairment in functioning, without meeting full criteria for another mental disorder and not simply an expectable reaction to the stressor."
      ],
      teach:"Adjustment disorder requires symptoms that are clinically significant — out of proportion to the stressor or clearly impairing — while falling short of full criteria for a depressive or anxiety disorder; the mixed subtype captures the common real-world overlap of low mood and worry rather than a pure presentation of either."
    },
    {
      id:"med-schizophrenia", date:"2026-05-28", answer:"Schizophrenia",
      accept:["schizophrenia"],
      clues:[
        "A 24-year-old graduate student is brought in by his roommate, who says he's become withdrawn and 'flat' over the past eight months, rarely initiating conversation and dropping out of his research lab.",
        "He acknowledges, with some hesitation, that he sometimes hears a low murmuring voice commenting on what he's doing when no one else is around, and admits 'part of me knows that's probably not real, but it still feels real when it happens.'",
        "He's become convinced his thesis advisor is subtly sabotaging his work by tampering with his data, a belief he holds firmly despite his roommate showing him evidence to the contrary — though he does concede, when pressed gently, that 'I guess it's possible I'm reading too much into it.'",
        "His roommate notes his speech has become sparse and his face expressionless even when discussing things that used to excite him, and he's stopped showering regularly, which his roommate initially chalked up to depression.",
        "A trial of an antidepressant six months ago did little for the flatness or withdrawal, and further questioning reveals the voice and the beliefs about his advisor were both present well before the antidepressant was started, alongside disorganized, tangential speech during the interview.",
        "Two or more of the following have been present for a significant portion of a one-month period, with continuous signs of disturbance persisting for at least six months: delusions, hallucinations, disorganized speech, grossly disorganized behavior, and negative symptoms such as diminished emotional expression or avolition — accompanied by a marked decline in occupational or social functioning since onset."
      ],
      teach:"Partial insight — a patient acknowledging a symptom 'might not be real' while still being unable to shake it — doesn't rule out a psychotic disorder; insight exists on a spectrum. Subtle negative symptoms like flattened affect and social withdrawal are commonly misattributed to depression, especially when they predate more obvious positive symptoms."
    },
    {
      id:"med-adhd-hyperactive", date:"2026-05-29", answer:"ADHD, Predominantly Hyperactive-Impulsive Presentation",
      accept:["adhd, predominantly hyperactive-impulsive presentation","adhd hyperactive-impulsive","adhd hyperactive","hyperactive-impulsive adhd"],
      clues:[
        "An 8-year-old boy's second-grade teacher requests a meeting after he's been sent to the principal's office three times this month for climbing on furniture and blurting out answers before questions are finished.",
        "His parents note he's always been 'go go go' — even as a toddler he never seemed to run out of energy — but it's become a bigger problem now that he's expected to sit through longer lessons.",
        "Notably, his teacher says his actual schoolwork is fine when he manages to sit still long enough to do it — he's not missing details or losing his materials, he simply can't stay seated, waits poorly for his turn, and interrupts other kids' games constantly.",
        "At home he squirms through dinner, runs and climbs in situations where it's clearly not appropriate like the dentist's waiting room, and often answers questions before his parents finish asking them.",
        "His parents report this has been consistent since kindergarten, occurs both at school and at home and during extracurricular activities, and is clearly interfering with his friendships since other kids have started avoiding playing with him.",
        "Six or more symptoms of hyperactivity and impulsivity — such as fidgeting, leaving one's seat when remaining seated is expected, running or climbing excessively, difficulty waiting one's turn, and frequently interrupting others — persisting for at least six months, present before age twelve, occurring in two or more settings, and causing clear interference with functioning, with attention symptoms notably not meeting the same threshold."
      ],
      teach:"The hyperactive-impulsive presentation is distinguished from the combined or inattentive presentations by intact attention and organization — this child isn't losing homework or missing details, he simply can't inhibit motor activity and impulses, which is an important distinction for tailoring behavioral interventions."
    },
    {
      id:"med-adhd-combined", date:"2026-05-30", answer:"ADHD, Combined Presentation",
      accept:["adhd, combined presentation","adhd combined type","combined type adhd","adhd"],
      clues:[
        "A 35-year-old attorney seeks evaluation after her new managing partner comments that she's 'brilliant but scattered,' something she's quietly heard variations of her whole career but always managed to outwork.",
        "She describes a lifelong pattern of elaborate systems — color-coded planners, three alarm clocks, sticky notes covering her monitor — that she built in high school to compensate for chronically losing track of assignments and deadlines.",
        "Since making partner-track and having a second child, the systems have started failing her: she's missed two filing deadlines, constantly misplaces her phone and keys, and finds herself blurting out interruptions in client meetings that she immediately regrets.",
        "She also describes an inner restlessness she's had since childhood — she was labeled a 'daydreamer' who fidgeted constantly and talked excessively, and even now she can't sit through a meeting without doodling or tapping her pen.",
        "Old report cards her mother saved describe her as bright but unable to finish tasks and easily distracted, symptoms she recognizes were present well before age twelve even though nobody evaluated her for this at the time.",
        "Both inattentive symptoms — such as difficulty sustaining attention, losing things, and being easily distracted — and hyperactive-impulsive symptoms — such as fidgeting, excessive talking, and interrupting others — have been present since childhood, occur across multiple settings, and now cause clinically significant impairment after years of compensatory strategies stopped being sufficient."
      ],
      teach:"High-achieving adults, especially women, often go undiagnosed for decades because intelligence and elaborate coping systems mask the underlying symptoms until life demands outpace the compensation — the diagnosis still requires childhood-onset symptoms, so a careful developmental history (report cards, parent recollections) is key."
    },
    {
      id:"med-tourettes", date:"2026-05-31", answer:"Tourette's Disorder",
      accept:["tourette's disorder","tourette syndrome","tourettes"],
      clues:[
        "A 29-year-old accountant seeks evaluation for what he calls 'exhaustion' — he says work leaves him utterly drained by 6pm even though the job itself isn't physically demanding.",
        "It emerges that since childhood he's had frequent eye blinking, shoulder shrugging, and a habit of clearing his throat repeatedly, which he's spent years learning to suppress around others through sheer concentration.",
        "The suppression works reasonably well during an eight-hour workday, but the moment he gets home and closes his apartment door, the movements and throat-clearing come back in a rush, sometimes worse than before, along with an occasional sharp grunt.",
        "He describes a rising, uncomfortable urge that builds before each movement or sound and is only relieved once he lets it happen, and says trying to hold everything in all day is what's actually causing the exhaustion, not the job itself.",
        "His mother recalls he had a simpler version of this — just eye blinking — starting around age seven, with vocal sounds joining a couple years later, and both have waxed and waned in severity ever since but have never fully gone away.",
        "Multiple motor tics and at least one vocal tic, not necessarily occurring together, have been present at some point during the illness, occurring many times a day nearly every day or intermittently for more than a year since before age eighteen, without a symptom-free period longer than three months."
      ],
      teach:"Tic suppression is effortful and often invisible to observers, which means adults with well-controlled public presentations can still carry a substantial, exhausting symptom burden — the premonitory urge and post-suppression rebound are core features often missed when tics aren't witnessed directly by the clinician."
    },
    {
      id:"med-anorexia-r", date:"2026-06-01", answer:"Anorexia Nervosa, Restricting Type",
      accept:["anorexia nervosa, restricting type","anorexia nervosa","anorexia","restricting type anorexia"],
      clues:[
        "A 19-year-old college sophomore is referred by her campus health center after a routine physical shows a BMI of 19.5 — technically within normal range — but her chart shows she weighed nearly 30 pounds more just eight months ago.",
        "She describes a steadily shrinking list of 'safe' foods, now down to about six items, and reports skipping meals frequently, all of which she frames as 'just eating healthy' after a summer diet that never really ended.",
        "She checks her weight multiple times daily, and even at her current weight — which her doctor calls medically unremarkable — she describes intense fear of gaining even a pound and says she feels her stomach and thighs are 'still too big.'",
        "She denies any binge eating or purging behavior, and there's no history of laxative or diuretic use — her weight control is exclusively through restriction and, more recently, an increase in daily exercise she describes as non-negotiable.",
        "Her roommate is the one who flagged the pattern, noting she's begun making excuses to avoid group meals and seems to derive real satisfaction from days when she eats the least, even as she's grown more irritable and cold-intolerant.",
        "Restriction of energy intake leading to a significantly low weight relative to the individual's own trajectory and developmental needs, intense fear of gaining weight or persistent behavior interfering with weight gain despite being at a low weight, and disturbance in the way body weight or shape is experienced, without recurrent binge-eating or purging behavior."
      ],
      teach:"'Atypical' presentations — where weight falls within or near normal range because it dropped from a higher baseline rather than into overtly emaciated territory — still meet full diagnostic criteria and can be medically serious; BMI alone is a poor screen and significant, rapid weight loss deserves attention even when the resulting number looks unremarkable."
    },
    {
      id:"med-anorexia-bep", date:"2026-06-02", answer:"Anorexia Nervosa, Binge-Eating/Purging Type",
      accept:["anorexia nervosa, binge-eating/purging type","anorexia nervosa binge purge type","anorexia binge-purge type","anorexia nervosa"],
      clues:[
        "A 22-year-old dance instructor is referred by her physical therapist after her weight, tracked over several visits for an unrelated knee injury, has dropped to a BMI of 16.8.",
        "She restricts heavily most days, often eating under 700 calories, but two or three times a week she describes losing control and eating large amounts of food quickly — usually foods she otherwise forbids herself — followed immediately by self-induced vomiting.",
        "She's also started using laxatives after some of these episodes, 'just to be sure,' and describes intense guilt and self-disgust in the hour after each one, though the pattern has repeated for at least four months now.",
        "She's terrified of gaining weight and checks her collarbones and hip bones in the mirror daily, saying she 'can't tell anymore' whether her body actually looks as thin as others say it does.",
        "Her dance career has made the restriction easier to hide — colleagues assume the strict eating is professional discipline — but her menstrual cycle stopped four months ago and she's had two fainting episodes at rehearsal that she attributed to dehydration.",
        "A significantly low body weight relative to what is expected, with intense fear of weight gain and disturbed perception of body shape or size, in which the individual has engaged in recurrent episodes of binge eating or purging behavior — such as self-induced vomiting or misuse of laxatives — during the current episode."
      ],
      teach:"The binge-eating/purging subtype of this restrictive-weight disorder is distinguished from bulimia nervosa purely by body weight — bulimia occurs at normal or above-normal weight, while this subtype requires a significantly low weight alongside the binge/purge behaviors, making an accurate weight and growth history essential to correct subtyping."
    },
    {
      id:"med-insomnia", date:"2026-06-03", answer:"Insomnia Disorder",
      accept:["insomnia disorder","insomnia","chronic insomnia"],
      clues:[
        "A 48-year-old woman with a longstanding, well-managed generalized anxiety diagnosis returns to her psychiatrist specifically about her sleep, which has stayed poor for the last year even as her daytime anxiety has settled nicely on her current medication.",
        "She takes over an hour to fall asleep most nights, wakes two to three times, and is up for good around 4:30am regardless of when she went to bed, three or more nights a week for the past fourteen months.",
        "Her psychiatrist initially assumed the sleep problems were just a residual anxiety symptom, but she clarifies that her worry levels during the day are genuinely low now — the poor sleep persists on its own and, if anything, is making her more anxious rather than the reverse.",
        "She's tried extending her time in bed to 'catch up,' which has only made things worse, and she now dreads bedtime itself, lying awake doing mental math about how many hours of sleep she'll get if she falls asleep 'right now.'",
        "She denies snoring, witnessed pauses in breathing, or leg discomfort at night, has a consistent bedtime routine, and her sleep environment is quiet and dark — nothing in the history points to a primary sleep-disordered-breathing or movement issue.",
        "Predominant dissatisfaction with sleep quantity or quality, involving difficulty initiating sleep, difficulty maintaining sleep, or early-morning awakening, occurring at least three nights per week for three months or more, causing significant distress or impairment, and persisting as an independent focus of concern even when other conditions are adequately treated."
      ],
      teach:"Insomnia can and often does become an independent clinical target requiring its own treatment even when a comorbid anxiety or mood disorder is well controlled — assuming poor sleep will simply resolve once the 'primary' condition is treated is a common error that delays effective care like CBT-I."
    },
    {
      id:"med-aud", date:"2026-06-04", answer:"Alcohol Use Disorder",
      accept:["alcohol use disorder","aud","alcoholism"],
      clues:[
        "A 51-year-old surgeon comes in at his wife's insistence, opening with 'I don't have a drinking problem — I've never missed a case, never shown up impaired, and I outperform half my partners.'",
        "Further questioning reveals he's been having three to four glasses of wine most nights for years, but over the past year that's crept to a bottle most nights, something he attributes to 'stress' and insists he could stop 'anytime.'",
        "He describes needing noticeably more now to get the same relaxed feeling he used to get from two glasses, and admits that on the rare nights he tries to cut back, he's noticeably more irritable and sleeps poorly.",
        "He's tried, unprompted, to cut down twice in the past year, lasting about four days each time before resuming, and acknowledges — reluctantly — that he thinks about his evening drink starting around 3pm most workdays.",
        "His wife notes he's given up his Saturday golf league because it interfered with an afternoon drink schedule he doesn't like to break, though he insists his surgical performance and reputation remain completely unaffected.",
        "A problematic pattern of use leading to significant impairment or distress, including drinking larger amounts than intended, persistent desire or unsuccessful efforts to cut down, a great deal of time spent obtaining or using, craving, giving up important activities in favor of use, tolerance, and withdrawal — with two or more such indicators present within a twelve-month period."
      ],
      teach:"Preserved occupational performance is a poor screen for this diagnosis — high-functioning individuals can meet full criteria through tolerance, failed attempts to cut down, craving, and activity loss while maintaining outward competence, and denial is often reinforced precisely because visible consequences haven't yet appeared."
    },
    {
      id:"med-oud", date:"2026-06-05", answer:"Opioid Use Disorder",
      accept:["opioid use disorder","oud","opioid addiction"],
      clues:[
        "A 58-year-old woman was prescribed oxycodone after spinal fusion surgery fourteen months ago and is still taking it, though her surgeon cleared her from a physical standpoint nearly a year ago.",
        "She's been getting prescriptions from two different providers for the last four months — her original surgeon and, more recently, an urgent care doctor — after her surgeon expressed concern about the ongoing refills.",
        "She's aware the amount she takes now is roughly double her original prescribed dose, achieved gradually by taking pills slightly more often than directed, and she describes real anxiety and physical discomfort — sweating, nausea, restlessness — on the two occasions she tried to taper on her own.",
        "She's stopped attending her book club and has been late to pick up her grandchildren twice, both because she was preoccupied with timing her next dose, something she finds embarrassing to admit given she's never used any other substance in her life.",
        "She insists she's 'not like' people who misuse street drugs, since everything she takes came from a legitimate prescription originally, and she's surprised and a little defensive when the term is raised in conversation.",
        "A problematic pattern of use leading to significant impairment, including taking more than intended, unsuccessful efforts to cut down, spending significant time obtaining the substance from multiple sources, craving, failure to fulfill role obligations, tolerance, and characteristic withdrawal symptoms on attempted discontinuation — with two or more indicators present within twelve months, regardless of whether use began under legitimate medical supervision."
      ],
      teach:"Origin from a legitimate prescription doesn't exempt someone from this diagnosis — tolerance, escalating self-directed dosing, doctor-shopping, and withdrawal on attempted tapering all count toward criteria regardless of how the substance was first obtained, and patients often resist the label specifically because of that legitimate starting point."
    },
    {
      id:"med-cannabis", date:"2026-06-06", answer:"Cannabis Use Disorder",
      accept:["cannabis use disorder","marijuana use disorder","cannabis dependence"],
      clues:[
        "A 34-year-old software developer comes in at his girlfriend's request, opening with 'I smoke weed every night to unwind, same as some people have a beer — I don't see the issue.'",
        "He's used cannabis daily for about six years, and over the last two has needed noticeably more to get the same relaxed effect, going from one or two hits to nearly half a gram most nights.",
        "He describes irritability, poor sleep, and a loss of appetite on the rare days he doesn't use, though he attributes this entirely to 'just being tired' rather than to the cannabis itself.",
        "He's tried to cut back to weekends only twice in the past year, each attempt lasting less than a week before he resumed his nightly pattern, and he's begun keeping a supply at his desk drawer at work 'just in case' he feels anxious during the day.",
        "His girlfriend notes he's stopped joining her for evening walks and has missed two early morning plans with friends because he was groggy from using late the night before, changes he brushes off as unrelated to his use.",
        "A problematic pattern of use leading to significant impairment or distress, including using in larger amounts than intended, persistent desire or unsuccessful efforts to cut down, craving, giving up important social or recreational activities because of use, continued use despite recognizing it's causing problems, tolerance, and withdrawal — with two or more such indicators present within a twelve-month period."
      ],
      teach:"Daily use framed as harmless routine relaxation can still meet full criteria once tolerance, failed cutback attempts, and functional withdrawal (irritability, sleep and appetite disruption) are present — cannabis's reputation as low-risk often delays patients and even clinicians from recognizing a use disorder that's already well established."
    },
    {
      id:"med-gambling", date:"2026-06-07", answer:"Gambling Disorder",
      accept:["gambling disorder","compulsive gambling","problem gambling"],
      clues:[
        "A 41-year-old father of two is referred after his wife discovered a secret credit card statement showing roughly $14,000 in online sports betting charges over the past eight months.",
        "He'd hidden the app behind a folder labeled 'work tools' on his phone, and admits he's been placing bets almost daily, often increasing his stakes after losses in an effort to 'get back to even.'",
        "He describes restlessness and irritability on the days he tries not to gamble, and says he's lied to his wife multiple times about where money went, including once claiming a car repair that never happened.",
        "He's borrowed money from his brother twice in the past year without telling his wife, and says thinking about his next bet — checking odds, planning strategy — occupies a significant part of his day, even during work meetings.",
        "He describes a specific pattern: after a big loss, he feels an urgent need to gamble again soon to recoup it, and after a rare win, he feels invincible and immediately raises his typical bet size, a cycle that's repeated for months.",
        "Persistent and recurrent problematic gambling causing significant distress or impairment, indicated by needing to gamble with increasing amounts to achieve the desired excitement, restlessness when attempting to cut down, repeated unsuccessful efforts to control it, preoccupation with gambling, gambling to escape distress, chasing losses, lying to conceal involvement, and relying on others for money because of gambling — four or more within a twelve-month period."
      ],
      teach:"Online gambling's accessibility and lack of visible tells — no casino trips, no smell of alcohol, just a phone — make concealment far easier than with substance use disorders, so 'chasing losses' and financial lying uncovered by a spouse are often the first visible signs, long after the pattern is well entrenched."
    },
    {
      id:"med-conduct", date:"2026-06-08", answer:"Conduct Disorder",
      accept:["conduct disorder"],
      clues:[
        "A 13-year-old boy is referred by his middle school after his fourth unexcused absence this month, though notably he's never been in a physical fight and teachers describe him as quiet, even polite.",
        "His parents discovered he's been sneaking out at night for the past several months, and last week found a stash of items in his backpack — headphones and a video game — that they're fairly sure came from a classmate's locker rather than a store.",
        "He's lied about his whereabouts repeatedly over the past year, including telling his parents he was at a friend's house on nights he was actually skipping school entirely, and forged his mother's signature on two absence notes.",
        "He broke into a neighbor's unlocked garage three months ago and took a bike, which he later abandoned a few blocks away, and his parents later learned he'd shoplifted small items from a convenience store on at least two other occasions.",
        "Notably, he's never hurt an animal or a person, hasn't destroyed property out of anger, and doesn't have a history of bullying — his pattern is consistently sneaky and rule-breaking rather than confrontational or aggressive, which is part of why it went unnoticed for so long.",
        "A repetitive and persistent pattern of behavior violating the basic rights of others or major age-appropriate societal norms, including deceitfulness or theft (lying to obtain goods or avoid obligations, breaking into a building, stealing without confrontation) and serious rule violations (staying out at night despite prohibition, truancy beginning before age thirteen), with three or more such behaviors present in the past twelve months and causing significant impairment, in the absence of any aggression toward people or animals."
      ],
      teach:"The covert, non-aggressive presentation — lying, theft, truancy, rule-breaking without confrontation — is easy to miss precisely because it lacks the dramatic aggression people associate with conduct problems; quiet, rule-breaking kids can meet full criteria and are often not identified until the pattern of deceit and theft becomes too large to ignore."
    },
    {
      id:"med-delirium", date:"2026-06-09", answer:"Delirium",
      accept:["delirium","hypoactive delirium"],
      clues:[
        "A 78-year-old woman, three days post-hip fracture surgery, is flagged by the nursing staff as 'suddenly depressed' — she's quiet, withdrawn, and barely touching her meals, a sharp change from her usual chatty self on the unit.",
        "Unlike the agitated, pulling-out-lines patients the team is used to worrying about, she lies still, stares at the wall for long stretches, and seems to drift in and out of a light doze throughout the day.",
        "When her daughter visits and asks what day it is, she guesses a month wrong and seems briefly confused about why she's in the hospital at all, though earlier that same morning she'd correctly told a nurse the date.",
        "Her attention wanders noticeably during conversation — she loses the thread of a simple question halfway through — and her daughter notes she seemed sharp and fully oriented just two days ago, before this quiet withdrawal began.",
        "A review of her chart shows a new urinary tract infection and a medication change three days ago, and the nursing notes describe her mental state as fluctuating — clearer in the morning, noticeably more muddled and withdrawn by early evening.",
        "A disturbance in attention and awareness that develops over a short period, represents an acute change from baseline, tends to fluctuate in severity over the course of a day, and is accompanied by an additional disturbance in cognition, with evidence that it is caused by a general medical condition or its treatment rather than a pre-existing or evolving neurocognitive disorder."
      ],
      teach:"Hypoactive delirium — quiet, withdrawn, and hypoalert rather than agitated — is under-recognized and frequently mistaken for depression or simple fatigue in hospitalized elderly patients, even though it carries similar or worse prognostic significance than the hyperactive form; the fluctuating course and acute onset relative to baseline are the key distinguishing features from depression, which doesn't produce genuine disorientation or fluctuating attention."
    },
    {
      id:"med-excoriation", date:"2026-06-10", answer:"Excoriation (Skin-Picking) Disorder",
      accept:["excoriation disorder","skin-picking disorder","excoriation (skin-picking) disorder","dermatillomania"],
      clues:[
        "A 26-year-old marketing coordinator has started wearing long sleeves in the middle of summer and has begun declining video calls with clients, citing 'camera issues.'",
        "She has multiple open sores and scabs on her forearms and scalp, mostly hidden under clothing or her hair, which she describes picking at during moments of boredom, stress, or while watching TV in the evening.",
        "She's tried covering the areas with bandages and even wearing gloves at home, and describes several attempts to stop entirely, each lasting a few days before she finds herself picking again, often without fully realizing she's started.",
        "A dermatologist ruled out a primary skin condition six months ago, noting the lesions' pattern and distribution were inconsistent with any dermatologic disease and consistent with repeated mechanical trauma from her own hands.",
        "She describes a brief sense of relief or satisfaction the moment she removes a piece of skin, immediately followed by shame, and says she's begun avoiding the beach and swimming with friends entirely because of visible scarring.",
        "Recurrent skin picking resulting in skin lesions, with repeated attempts to decrease or stop the behavior, causing clinically significant distress or impairment, and not attributable to a substance or another medical or mental condition."
      ],
      teach:"This diagnosis requires ruling out a primary dermatologic cause and confirming the lesions result from the patient's own repeated picking, distinguishing it from conditions like eczema; the relief-then-shame cycle mirrors other body-focused repetitive behaviors and often drives significant social avoidance and concealment."
    },
    {
      id:"med-adhd-inattentive", date:"2026-06-11", answer:"ADHD, Predominantly Inattentive Presentation",
      accept:["adhd, predominantly inattentive presentation","adhd inattentive type","inattentive adhd","adhd-pi"],
      clues:[
        "A 41-year-old university professor seeks evaluation after her department chair gently noted she's missed three grant deadlines this year despite being, in his words, 'one of the sharpest minds in the department.'",
        "She's never been hyperactive or impulsive — she describes herself as calm, quiet, and easily overlooked in meetings, which she now realizes let her inattention symptoms go unnoticed for decades since she was never a 'behavior problem.'",
        "She describes a lifetime of losing track of details mid-task, rereading the same paragraph five times without absorbing it, and a home office so disorganized with half-finished projects that she's stopped inviting colleagues over.",
        "Old report cards, which her mother recently gave her, describe her as 'bright but dreamy' and 'often seems to be elsewhere,' and she recalls being unable to finish tests on time throughout school despite clearly knowing the material.",
        "She's built her entire academic career around narrow hyperfocus on topics that fascinate her, which masked the difficulty for years, but broader administrative demands — emails, scheduling, paperwork — have become increasingly unmanageable and she's begun missing things that matter.",
        "Six or more symptoms of inattention — such as difficulty sustaining attention, seeming not to listen, failing to follow through on tasks, disorganization, avoidance of tasks requiring sustained mental effort, losing things, and being easily distracted — present since before age twelve, persisting across multiple settings for at least six months, without the accompanying hyperactive-impulsive symptoms reaching the same threshold."
      ],
      teach:"The inattentive presentation is frequently missed in high-achieving, quiet individuals — especially women — because the absence of disruptive hyperactivity means the condition doesn't draw attention until intelligence and hyperfocus on narrow interests can no longer compensate for broader executive demands; a childhood history remains required even when diagnosed decades later."
    },
    {
      id:"med-sld", date:"2026-06-12", answer:"Specific Learning Disorder",
      accept:["specific learning disorder","dyslexia","learning disability","specific learning disorder with impairment in reading"],
      clues:[
        "A 36-year-old operations manager requests testing after a recent promotion to a role requiring him to write detailed reports, something he's managed to avoid for his entire career through careful job selection.",
        "He describes a lifelong pattern of reading far more slowly than peers, frequently reversing or mixing up similar-looking words, and needing to reread sentences multiple times to retain their meaning — something he always attributed to just 'not being a reader.'",
        "He built an elaborate set of workarounds over the years: memorizing rather than reading manuals, relying heavily on spellcheck and text-to-speech, and asking colleagues to summarize written material verbally instead of reading it himself.",
        "His new role requires drafting reports without those workarounds readily available, and for the first time since childhood he's struggling visibly, missing deadlines and turning in work with spelling and word-order errors that don't match his obvious verbal intelligence in meetings.",
        "He recalls being placed in a remedial reading group briefly in third grade, an experience he found humiliating, after which his parents got him a private tutor and the school never revisited formal testing — his difficulties never actually resolved, just became better hidden.",
        "Persistent difficulties learning and using academic skills — specifically accuracy or fluency of word reading and spelling — that are substantially below what would be expected for age, confirmed by standardized measures, have been present since school-age years even if not fully identified until compensatory strategies became insufficient, and are not better explained by intellectual disability or inadequate instruction."
      ],
      teach:"Compensated learning disorders can remain hidden for decades in intelligent adults who build effective workarounds — the diagnosis still requires a school-age onset, so an adult presenting for the first time needs a careful developmental history rather than dismissal on the grounds that 'they clearly are smart enough not to have this.'"
    },
    {
      id:"med-autism", date:"2026-06-13", answer:"Autism Spectrum Disorder",
      accept:["autism spectrum disorder","asd","autism"],
      clues:[
        "A 32-year-old project manager seeks evaluation after her therapist, treating her for burnout, noticed a pattern that didn't quite fit anxiety alone: exhaustion specifically tied to a full day of meetings, regardless of workload.",
        "She describes consciously rehearsing small talk before client calls, forcing eye contact because she's read it's expected, and mimicking colleagues' tone and body language — strategies she developed in her twenties after being told in a performance review that she seemed 'cold.'",
        "By the end of most workdays she needs to retreat to her car for twenty minutes of silence before she can drive home, and describes this recovery time as non-negotiable, something she's rarely told anyone about out of embarrassment.",
        "She's had the same three lunch foods on rotation for years, finds unplanned schedule changes disproportionately distressing even when minor, and has intense, deeply researched interests — most recently competitive birdwatching — that she can discuss for hours if given the opening.",
        "Her mother, when asked, recalls she was a quiet, literal-minded child who lined up toys by color rather than playing pretend with them, had one close friend rather than groups, and was distressed by scratchy clothing tags well into elementary school — traits nobody connected to anything at the time since she did well academically.",
        "Persistent deficits in social-emotional reciprocity and nonverbal communication across contexts, present since early development though possibly not fully apparent until social demands exceeded compensatory capacity, along with restricted, repetitive patterns of behavior or interests such as insistence on sameness, highly restricted fixated interests, and hyper- or hyporeactivity to sensory input — causing significant impairment in functioning."
      ],
      teach:"Camouflaging — consciously rehearsing eye contact, scripting conversation, mimicking peers — allows many adults, especially women, to go undiagnosed well into adulthood, with the cost showing up as chronic exhaustion or burnout rather than obvious social deficits; a childhood developmental history is still required, but symptoms may only become impairing once compensatory effort outpaces capacity."
    },
    {
      id:"med-id", date:"2026-06-14", answer:"Intellectual Disability",
      accept:["intellectual disability","intellectual developmental disorder","mild intellectual disability"],
      clues:[
        "A 34-year-old man is brought to an evaluation by his older sister after he lost the warehouse job he'd held for nine years when the facility closed, and he's since struggled to find or keep any new position.",
        "He completed high school in general education classes with a lot of unofficial help from teachers and family, never formally tested, and has always lived with either his parents or his sister, who's quietly managed his finances and appointments without either of them naming it as such.",
        "At job interviews he's had trouble understanding multi-step instructions, filling out applications independently, or explaining his previous role in a way interviewers found clear, and he's begun avoiding trying altogether out of frustration and embarrassment.",
        "His sister describes him as warm, hardworking, and able to hold a simple, well-practiced routine perfectly — his old job involved memorized, repetitive tasks he did well for years — but he cannot manage a budget, navigate unfamiliar bus routes alone, or read a document more complex than a simple form.",
        "Cognitive testing places his overall intellectual functioning meaningfully below average, and adaptive functioning testing confirms significant difficulty with conceptual skills like money management and reading comprehension, alongside more intact practical and social skills, all traceable back to his school years even though nobody pursued formal diagnosis at the time.",
        "Deficits in intellectual functions such as reasoning, problem solving, and abstract thinking, confirmed by both clinical assessment and standardized testing, together with deficits in adaptive functioning that fail to meet developmental and sociocultural standards for independence in conceptual, social, or practical domains, with onset during the developmental period."
      ],
      teach:"Mild intellectual disability is frequently masked for years by consistent routines and quiet family support, only becoming apparent when a life disruption — job loss, a move, a caregiver's death — removes the scaffolding; diagnosis requires deficits in both intellectual and adaptive functioning with onset in the developmental period, not adult-onset testing alone."
    },
    {
      id:"med-arfid", date:"2026-06-15", answer:"Avoidant/Restrictive Food Intake Disorder",
      accept:["avoidant/restrictive food intake disorder","arfid"],
      clues:[
        "An 11-year-old girl is brought to a pediatric GI clinic after losing eight pounds over four months, a significant amount for her age and height, with no history of body image concerns or desire to be thinner.",
        "Her parents trace the change to a choking incident on a piece of chicken at a restaurant seven months ago, after which she became increasingly reluctant to eat anything with texture, eventually narrowing her diet to pureed and liquid foods.",
        "She insists she's hungry and wants to eat more, and doesn't express any distaste for the taste, smell, or texture of the excluded foods themselves — her stated fear, every time, is specifically that she'll choke again.",
        "She's begun cutting even soft foods into tiny pieces and chewing each bite an extreme number of times before swallowing, and has started refusing school lunch entirely because she's afraid of choking without a parent nearby to help.",
        "A pediatric GI workup found no structural or motility abnormality that would explain difficulty swallowing, and her pediatrician confirms her weight loss and now-required nutritional supplement drinks are a direct consequence of the eating restriction rather than any medical condition.",
        "An eating or feeding disturbance manifested by persistent failure to meet nutritional needs, associated with significant weight loss and nutritional deficiency, driven by a lack of interest in eating or, specifically, fear of aversive consequences such as choking or vomiting rather than by concerns about body weight or shape, and not better explained by a co-occurring medical condition or lack of available food."
      ],
      teach:"The fear-of-aversive-consequences presentation — typically following a choking, vomiting, or similar frightening event — is a distinct pathway into this diagnosis from the sensory-aversion presentation, and is identified by the specific, event-linked fear rather than by dislike of taste or texture; body image concerns must be absent to distinguish it from anorexia nervosa."
    },
    {
      id:"med-aspd", date:"2026-07-17", answer:"Antisocial Personality Disorder",
      accept:["antisocial personality disorder","aspd","antisocial pd","sociopathy"],
      clues:[
        "A 34-year-old startup founder is referred by his executive coach after two co-founders quietly cut ties with him, citing a pattern they can't quite articulate.",
        "Colleagues describe him as charming and quick to say what people want to hear in meetings, but coworkers have noticed invoices and expense reports don't always match what actually happened.",
        "He mentions, almost proudly, that he talked his way out of a felony fraud charge in his twenties by convincing the arresting officer he was someone else's employee; he shows no discomfort recounting it.",
        "Unlike the stereotype of someone cycling through the corrections system, he's never spent a night in jail — he channels the same instincts into aggressive deal-making, cutting corners on contracts and quietly reneging on verbal agreements once they're inconvenient.",
        "His coach notes he seems to feel real irritation when a plan is thwarted but never guilt about the people harmed along the way, and he described a former business partner's bankruptcy, which he caused, as \"not my problem.\"",
        "There is a pervasive pattern since age 15 of disregard for and violation of the rights of others, evidenced by at least three of: deceitfulness (repeated lying or conning for profit), impulsivity, irritability and aggressiveness, reckless disregard for safety of self or others, consistent irresponsibility, and lack of remorse; conduct problems were present before age 15, and the behavior isn't better explained by a manic or psychotic episode."
      ],
      teach:"The \"successful psychopath\" phenotype channels deceit and lack of remorse into socially rewarded arenas like business rather than criminal behavior — the same core traits just look different depending on the person's intelligence, charm, and opportunity. A childhood conduct disorder history before age 15 is required to distinguish this from adult-onset antisocial behavior."
    },
    {
      id:"med-schizoid-pd", date:"2026-07-18", answer:"Schizoid Personality Disorder",
      accept:["schizoid personality disorder","schizoid pd","schizoid"],
      clues:[
        "A 45-year-old software engineer is brought in by his sister, who worries he's \"given up on life\" after their mother's death, though he insists he's doing fine.",
        "He works from home, has done so for a decade, and says he prefers it that way; he can go days without speaking to another person and doesn't seem to mind.",
        "He has one hobby — assembling mechanical keyboards — that he does alone in his apartment, and when asked about friends, he says he \"never really saw the point,\" not out of anxiety but genuine indifference.",
        "His sister worries he might be depressed, but he denies sadness, describes his mood as flat but stable, and says praise or criticism from coworkers barely registers with him either way.",
        "He was briefly in a relationship in his twenties that ended when his partner said she \"couldn't tell if he loved her\"; he agrees this was probably true and doesn't seem bothered by the memory.",
        "A pervasive pattern, present since early adulthood, of detachment from social relationships and a restricted range of emotional expression, shown by at least four of: neither desiring nor enjoying close relationships including family, almost always choosing solitary activities, little interest in sexual experiences with another person, few if any activities bring pleasure, lack of close friends, indifference to praise or criticism, and emotional coldness or flattened affect."
      ],
      teach:"Schizoid personality disorder is marked by genuine indifference to social connection rather than fear of it — distinguishing it from social anxiety or avoidant personality disorder, where isolation stems from a desire for connection thwarted by fear of rejection. The flat mood can be mistaken for depression, but there's no anhedonia in the depressive sense — pleasure was never really sought in the first place."
    },
    {
      id:"med-schizotypal-pd", date:"2026-07-19", answer:"Schizotypal Personality Disorder",
      accept:["schizotypal personality disorder","schizotypal pd","schizotypal"],
      clues:[
        "A 26-year-old graduate student is referred by her academic advisor after classmates complained that group projects with her feel \"unsettling.\"",
        "She dresses in a distinctive, slightly mismatched way she says reflects her \"energy,\" and she often veers into long, tangential explanations that are hard for listeners to follow, though she isn't formally thought-disordered.",
        "She tells you she can sometimes sense when someone is about to text her moments before it happens, and that she avoids wearing red on exam days because it \"throws off her luck\" — she holds these beliefs firmly but without full conviction that they're literally true.",
        "She has one close friend from childhood and says she finds most social situations confusing rather than distressing; in unfamiliar groups she becomes noticeably suspicious that people are talking about her behind her back.",
        "Her affect is often incongruent — she'll laugh while describing something sad — and coworkers have described her as \"odd\" rather than unfriendly; there's no history of a formal psychotic episode with clear delusions or hallucinations.",
        "A pervasive pattern, beginning by early adulthood, of social and interpersonal deficits marked by acute discomfort with close relationships and by cognitive and perceptual distortions and eccentric behavior, shown by at least five of: ideas of reference, odd beliefs or magical thinking inconsistent with subcultural norms, unusual perceptual experiences, odd thinking and speech, suspiciousness or paranoid ideation, inappropriate or constricted affect, odd or eccentric behavior or appearance, lack of close friends, and excessive social anxiety associated with paranoid fears rather than negative self-judgment."
      ],
      teach:"Schizotypal personality disorder sits on the schizophrenia spectrum genetically, but the odd beliefs and perceptual experiences are held with some insight and don't reach delusional intensity — the key differential point separating it from a primary psychotic disorder."
    },
    {
      id:"med-dissoc-amnesia", date:"2026-07-20", answer:"Dissociative Amnesia",
      accept:["dissociative amnesia","dissociative fugue","psychogenic amnesia"],
      clues:[
        "A 39-year-old man is brought to an ED by police after being found sitting on a bus bench three states away from home, unable to say how he got there.",
        "He has no memory of the past eight days, including leaving his job and family; he's calm about this rather than distressed, and he was found going by a different first name to strangers at a diner the night before.",
        "His wife reports he'd been served divorce papers the morning before he disappeared, and that a brother he hadn't spoken to in years had also just died — both facts he can't recall when asked directly.",
        "Neurological exam, labs, and a head CT are unremarkable, and he has no history of seizures or substance use that would explain the gap; he isn't malingering — he seems genuinely puzzled and mildly unsettled once told what he's missed.",
        "Over the next two days in the hospital, most of his memory returns in patches, though the day the papers arrived remains blank; he has no prior psychiatric history besides a distant episode of forgetting a car accident's details as a teenager.",
        "An inability to recall important autobiographical information, usually of a traumatic or stressful nature, that is inconsistent with ordinary forgetting, accompanied in this case by apparently purposeful travel and confusion about identity, not attributable to a substance or neurological or medical condition, and causing significant distress or impairment once recognized."
      ],
      teach:"Dissociative amnesia with the fugue specifier involves sudden, purposeful travel or wandering plus identity confusion, typically triggered by overwhelming psychosocial stress — here, simultaneous loss (divorce, bereavement). The intact neuro workup and patchy, stress-linked recovery pattern distinguish it from a medical amnestic syndrome."
    },
    {
      id:"med-conversion", date:"2026-07-21", answer:"Conversion Disorder (Functional Neurological Symptom Disorder)",
      accept:["conversion disorder","functional neurological symptom disorder","fnd","psychogenic nonepileptic seizures","pnes"],
      clues:[
        "A 24-year-old woman is referred to psychiatry after her third ED visit this month for \"seizures\" that her neurologist says don't fit a typical pattern.",
        "Witnesses describe episodes where her eyes stay closed and squeezed shut, her limbs thrash asynchronously side to side, and the episodes can last ten or fifteen minutes without her becoming cyanotic or incontinent.",
        "A continuous video-EEG captured one of these events with no epileptiform activity during or after, even though she was clearly unresponsive to voice and touch throughout.",
        "She mentions, almost in passing, that the episodes started a few months after a car accident that wasn't her fault, for which she was found partially liable in an ongoing insurance dispute; she seems more frustrated by not being believed than by the episodes themselves.",
        "She isn't exaggerating for attention or financial gain in any way that's discoverable — she genuinely experiences the episodes as happening to her, and she has intact strength and sensation between attacks with a normal neurological exam otherwise.",
        "One or more symptoms of altered voluntary motor or sensory function are present, clinical findings provide evidence of incompatibility between the symptom and recognized neurological or medical conditions (here, an EEG-negative event pattern inconsistent with epilepsy), the symptom is not better explained by another medical or mental disorder, and it causes clinically significant distress or impairment — with no evidence the symptoms are intentionally produced."
      ],
      teach:"Video-EEG showing no epileptiform activity during a witnessed \"seizure\" — combined with features like closed, resistant eyelids and long duration without injury — is the gold-standard way to distinguish psychogenic nonepileptic seizures from true epilepsy. Unlike factitious disorder or malingering, the symptoms here are not intentionally produced; the patient's distress and confusion are genuine."
    },
    {
      id:"med-illness-anxiety", date:"2026-07-22", answer:"Illness Anxiety Disorder",
      accept:["illness anxiety disorder","hypochondriasis","health anxiety"],
      clues:[
        "A 29-year-old marketing associate schedules a same-day appointment convinced she has a serious illness, after her smartwatch flagged an \"irregular heart rhythm\" during a Tuesday morning meeting.",
        "Her cardiac workup, including an EKG and 48-hour monitor, is entirely normal, but she immediately starts searching symptom-checker apps for rarer conditions that could still explain a single flagged reading, landing on three different diagnoses by the end of the week.",
        "She checks her resting heart rate on her watch dozens of times a day and has switched primary care doctors twice in the past year after each one told her testing was unnecessary; she says this made her feel dismissed rather than reassured.",
        "She has almost no physical symptoms to report — no chest pain, no palpitations she can point to — her worry is about what the data might be hiding rather than anything she actually feels.",
        "She acknowledges, when pressed, that she knows her fear is probably out of proportion, but she can't stop checking; the preoccupation has been present for about eight months and has started affecting her sleep and her ability to focus at work.",
        "Preoccupation with having or acquiring a serious, undiagnosed illness lasting at least six months, with somatic symptoms that are absent or only mild in intensity, a high level of health-related anxiety, and excessive health-related behaviors such as repeatedly checking for signs of illness or repeated care-seeking, not better explained by another mental disorder."
      ],
      teach:"Illness anxiety disorder is now split from what used to be called hypochondriasis into a \"care-seeking type\" — here, driven by consumer wearables and symptom-checker apps rather than physical symptoms, an increasingly common modern presentation. The anxiety is about the meaning of data rather than bodily sensations themselves, and reassurance from clinicians provides only brief relief."
    },
    {
      id:"med-mild-ncd", date:"2026-07-23", answer:"Mild Neurocognitive Disorder",
      accept:["mild neurocognitive disorder","mild ncd","mild cognitive impairment","mci"],
      clues:[
        "A 52-year-old high school teacher requests an evaluation after struggling to keep up with lesson planning, something she says used to take her half the time.",
        "She had a confirmed COVID infection about five months ago with a rough first two weeks, and since then describes trouble finding words mid-sentence and needing to re-read emails two or three times to absorb them.",
        "Her colleagues haven't noticed major changes, and she's still functioning independently — paying bills, driving, managing her household — but she's started leaving herself more notes and double-checking grade entries she never used to worry about.",
        "She wonders aloud whether she's just depressed, and she does endorse low energy and some frustration with herself, but she denies low mood, guilt, or loss of interest in things she still enjoys on weekends, and formal screening for depression is negative.",
        "Neuropsychological testing shows mild deficits in processing speed and working memory relative to her estimated baseline, without significant impairment in more complex domains, and an MRI is unremarkable aside from nonspecific age-appropriate changes.",
        "Evidence of modest decline from a previous level of performance in one or more cognitive domains, based on concern of the individual or a knowledgeable informant plus objectively documented impairment on testing, that does not interfere with capacity for independence in everyday activities, and is not better explained by another mental disorder such as depression or by delirium."
      ],
      teach:"Post-viral cognitive complaints (\"brain fog\") can objectively map onto true mild neurocognitive impairment on testing, distinct from pseudodementia caused by depression — the key differentiator is a negative depression screen alongside preserved interest and mood, plus testing that shows real, if mild, deficits rather than global effortful underperformance."
    },
    {
      id:"med-no-diagnosis", date:"2026-07-24", answer:"No diagnosis (culturally normative)",
      accept:["no diagnosis","normal","culturally normative","not a disorder","none"],
      clues:[
        "A 22-year-old woman is brought to urgent care by a concerned coworker after \"passing out\" and speaking in an unfamiliar language during her church's Sunday revival service, though she was breathing normally and came to within a couple of minutes.",
        "She grew up in a Pentecostal congregation where these episodes — described within the church as being \"slain in the Spirit\" — are a recognized and expected part of worship, occurring most often during extended, emotional praise services.",
        "She recalls the sensation as an overwhelming warmth and loss of ordinary self-awareness, followed by a few minutes she can't fully account for, but she isn't frightened by this — she describes it as one of the most meaningful experiences of her faith.",
        "The coworker, unfamiliar with Pentecostal worship, worried it looked like a seizure or a dissociative break, but the episode occurred only in the expected ritual context, resolved without any confusion or injury, and the congregation around her responded with familiar, supportive rituals rather than alarm.",
        "A full history finds no other episodes outside of worship settings, no memory gaps in daily life, no substance use, and no impairment in her work or relationships — if anything, she describes these experiences as restorative and central to her sense of community.",
        "A trance or altered state of awareness occurring as an accepted, expected part of a broadly accepted collective cultural or religious practice, not causing clinically significant distress or impairment outside the ritual context, and therefore not indicative of a mental disorder despite superficially resembling a dissociative or seizure-like episode."
      ],
      teach:"DSM-5 explicitly excludes trance and possession states that are a normal part of a broadly accepted collective cultural or religious practice from dissociative disorder diagnosis — the key distinguishing features are that the experience occurs only in the expected ritual context, doesn't cause distress or impairment, and is understood and supported by the person's community."
    },
    {
      id:"med-factitious", date:"2026-07-25", answer:"Factitious Disorder",
      accept:["factitious disorder imposed on another","factitious disorder by proxy","munchausen by proxy","fdia"],
      clues:[
        "A pediatric hospitalist requests a psychiatric consult about the mother of a 4-year-old who has been admitted seven times in the past year for unexplained vomiting and low blood sugar episodes that resolve promptly whenever she's separated from her daughter for testing.",
        "The mother is attentive and knowledgeable, often correcting nursing staff on her daughter's history and requesting additional tests; staff describe her as devoted, and she seems to thrive on the attention and rapport she's built with the care team.",
        "A covert review of the chart timeline shows symptoms consistently begin during unsupervised visits and stop during periods of continuous observation, and a toxicology screen eventually detects insulin metabolites inconsistent with the child's own physiology.",
        "When the findings are gently raised, the mother is not seeking any material or financial gain — she isn't pursuing a lawsuit or disability benefits for either of them — she simply insists the doctors are missing something and asks for another specialist referral.",
        "The child, when out of her mother's care during the admission, shows no symptoms at all and, developmentally, seems to have absorbed a sense of herself as chronically fragile, deferring constantly to her mother to describe how she feels.",
        "Falsification of physical or psychological signs or symptoms, or induction of injury or disease, in another person, associated with identified deception, with the individual presenting the other person to others as ill, impaired, or injured, in the absence of obvious external rewards, and not better explained by another mental disorder."
      ],
      teach:"Factitious disorder imposed on another (formerly Munchausen syndrome by proxy) is diagnosed in the caregiver, not the child, and hinges on identified deception plus absence of external incentives like disability payments or litigation, distinguishing it from malingering by proxy. The perpetrator's polished, engaged relationship with staff is a classic feature, not a reassuring sign against the diagnosis."
    },
    {
      id:"med-dpdr", date:"2026-07-26", answer:"Depersonalization/Derealization Disorder",
      accept:["depersonalization/derealization disorder","depersonalization disorder","derealization disorder","dpdr"],
      clues:[
        "A 19-year-old college sophomore comes in worried something is \"seriously wrong with my brain\" after weeks of feeling like he's watching himself from outside his own body.",
        "He describes walking across campus and suddenly feeling like the buildings and people around him are flat, like a movie set, and that sounds seem muffled and distant even though his hearing tests are normal.",
        "The episodes started after a stretch of high stress around finals and heavy marijuana use, but they've persisted for two months now even after he cut back on using entirely, occurring most days for stretches of an hour or more.",
        "He worries he might be developing psychosis, but he's clear that he knows these feelings aren't real — he's never doubted that his body and the world are actually normal, just that they don't feel that way to him.",
        "A full medical workup, including neurology consultation and an EEG for possible temporal lobe seizures, is unremarkable, and he has no history of a primary psychotic or seizure disorder.",
        "Persistent or recurrent experiences of feeling detached from one's own mental processes or body, and/or experiences of unreality of surroundings, while reality testing remains intact throughout, causing clinically significant distress, and not attributable to substance use, another medical condition, or another mental disorder such as a psychotic illness."
      ],
      teach:"Intact reality testing — the person knows the detachment isn't literally true, however distressing it feels — is what separates depersonalization/derealization disorder from a psychotic process, and is a crucial reassurance point for patients who fear they're \"going crazy.\" Symptoms triggered by cannabis or acute stress can outlast the trigger itself and become a persistent disorder in their own right."
    },
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
    },
    {
      id:"hard-bipolar-psychotic", date:"2026-06-29", answer:"Bipolar I Disorder, With Psychotic Features",
      accept:["bipolar i disorder with psychotic features","bipolar 1 with psychotic features","bipolar i with psychotic features","bipolar disorder with psychosis"],
      clues:[
        "A 26-year-old musician is brought to the ER by his bandmates after a chaotic week. They say \"he's just been on one of his creative streaks,\" but this time it's gone somewhere different.",
        "He hasn't slept more than two hours a night for eight days. He's convinced he's been selected to write an album that will \"realign global consciousness,\" and has been recording nonstop, calling labels at 3am.",
        "In the past 48 hours he's also started saying that the radio is responding directly to his thoughts and that a famous producer has been secretly communicating with him through song lyrics on the street.",
        "He's irritable when challenged, has spent thousands on studio equipment, and his speech is so rapid and tangential that his bandmates can barely follow him.",
        "He has a history of one depressive episode two years ago, but nothing like this — and no substance use is found on tox screen. A thyroid panel and other medical workup are unremarkable.",
        "The grandiosity here has crossed a line: it's not just confident self-belief but a fixed, false conviction (the radio responding to his thoughts) that persists regardless of evidence against it.",
        "A manic episode of over a week's duration — elevated mood, decreased need for sleep, grandiosity, pressured speech, excessive spending — accompanied by delusions and possible hallucinations occurring exclusively during the mood episode, with this severity requiring hospitalization."
      ],
      teach:"The psychotic features specifier applies when delusions or hallucinations occur during a manic or depressive episode. Distinguishing from schizoaffective disorder hinges on timing: here, psychotic symptoms appear only within the manic episode, not also during periods of stable mood."
    },
    {
      id:"hard-dmdd", date:"2026-06-30", answer:"Disruptive Mood Dysregulation Disorder",
      accept:["disruptive mood dysregulation disorder","dmdd"],
      clues:[
        "A 10-year-old boy is referred by his school after his fourth \"blow-up\" this month — over what staff describe as minor frustrations, like losing a board game.",
        "His mother says he seems angry and irritable almost every day, even between the outbursts, which she describes as \"always simmering, like he's one wrong word away from exploding.\"",
        "The outbursts themselves are severe — yelling, throwing objects, occasionally hitting walls — occurring three or more times a week, out of proportion to the trigger, and present since age 7.",
        "His teacher initially wondered about bipolar disorder given the intensity of his outbursts, but there's never been a distinct period of elevated or euphoric mood, grandiosity, or decreased need for sleep — just persistent irritability punctuated by rage.",
        "The pattern shows up consistently both at school and at home, and his parents say there's never really a \"good mood\" baseline anymore — even his calm moments have an edge to them.",
        "Ruling out: no manic or hypomanic episodes ever, which is the critical exclusion here — that absence is what keeps this from being a bipolar diagnosis despite the outburst severity.",
        "Severe recurrent temper outbursts grossly out of proportion to the situation, occurring three or more times weekly, with persistently irritable or angry mood between outbursts most of the day nearly every day, present for over a year across multiple settings, with onset before age 10 and no history of a manic or hypomanic episode."
      ],
      teach:"DMDD was added in DSM-5 partly to curb overdiagnosis of pediatric bipolar disorder in children with chronic irritability rather than episodic mania. The absence of a distinct manic/hypomanic episode is the key differentiator — irritability alone, however severe, is not mania."
    },
    {
      id:"hard-id", date:"2026-07-01", answer:"Intellectual Disability",
      accept:["intellectual disability","intellectual disability id","intellectual developmental disorder","mental retardation"],
      clues:[
        "A 19-year-old is brought in by his mother for a transition-planning evaluation as he ages out of school services. He's polite and easygoing throughout the interview.",
        "Formal testing places his IQ around 65. But his mother is most concerned about daily life: he cannot manage money, gets lost easily even on familiar routes, and needs reminders for basic hygiene tasks.",
        "He communicates in short, simple sentences and struggles to follow multi-step instructions, though he's affectionate, cooperative, and has held a part-time job bagging groceries for two years with support from a job coach.",
        "His mother mentions he was a \"late bloomer\" — walking at 20 months, first words around age 3, and consistently behind peers academically from kindergarten onward, never catching up despite tutoring.",
        "He has no autism diagnosis (his social reciprocity and eye contact are intact, and he enjoys interacting with new people) and no regression — his trajectory has been one of steady, if slow, gradual development since birth.",
        "Whether this remains a relevant diagnosis depends less on the IQ number alone and more on a second piece of information: how much support he actually needs to function day to day.",
        "Significant limitations in both intellectual functioning (reasoning, problem-solving, abstract thinking — roughly two standard deviations below average) and adaptive functioning (conceptual, social, and practical skills needed for independence), with onset during the developmental period."
      ],
      teach:"Diagnosis requires deficits in BOTH intellectual functioning (IQ testing) AND adaptive functioning (real-world independence skills) — IQ score alone is insufficient, and severity levels are actually defined by adaptive functioning, not IQ. Onset during the developmental period distinguishes it from acquired cognitive impairment later in life."
    },
    {
      id:"hard-pyromania", date:"2026-07-02", answer:"Pyromania",
      accept:["pyromania"],
      clues:[
        "A 17-year-old is referred by the juvenile court system after his third fire-related incident this year, the most recent significant enough to draw a fire engine response.",
        "He denies any anger at the people or property affected, and there's no insurance fraud motive, no gang involvement, and no political statement attached. He says he just likes watching fires.",
        "He describes a build of tension before setting each fire, and intense fascination and relief while watching it burn — he often stays to watch firefighters work and has shown up to unrelated fires in the neighborhood just to observe.",
        "He's curious about fire equipment, has set off false alarms \"just to see what happens,\" and keeps a private collection of lighters and matches he describes almost reverently.",
        "He has no conduct disorder history otherwise — no stealing, no aggression toward people or animals — and isn't manic, intoxicated, or psychotic during these episodes; his judgment is otherwise intact.",
        "He has, on more than one occasion, deliberately and purposefully set the fires himself — this isn't curiosity-driven accidental fire-starting from younger childhood, and it isn't in response to a delusion or hallucination.",
        "Deliberate, purposeful fire-setting on more than one occasion, with tension or arousal before the act, fascination with and attraction to fire and its situational context, and pleasure or relief when setting fires or witnessing their aftermath — not done for monetary gain, anger, political ideology, or in response to impaired judgment from another condition."
      ],
      teach:"Pyromania is a rare impulse-control disorder requiring exclusion of more common motives for fire-setting (revenge, profit, conduct disorder-related destructiveness, psychosis). The fascination with fire itself — not what it accomplishes — is the diagnostic core, structurally similar to kleptomania's relationship to theft."
    },
    {
      id:"hard-hypersomnolence", date:"2026-07-03", answer:"Hypersomnolence Disorder",
      accept:["hypersomnolence disorder","hypersomnia","primary hypersomnia"],
      clues:[
        "A 24-year-old graduate student is referred after repeatedly falling asleep during her thesis committee meetings, despite sleeping nine to ten hours a night.",
        "She describes excessive daytime sleepiness most days for the past four months, plus difficulty fully waking up — a period of confusion and grogginess lasting up to 30 minutes after her alarm, during which she's not fully oriented.",
        "She's tried napping, but naps don't leave her feeling refreshed. A sleep study finds no obstructive apnea and normal oxygen saturation throughout the night.",
        "She denies any sudden muscle weakness with strong emotion, no vivid hallucinations as she's falling asleep, and no episodes of waking up unable to move — none of the more dramatic features some sleep disorders carry.",
        "Her mood is stable, she's not on any sedating medication, and a urine tox screen is clean. Iron studies and thyroid panel are normal.",
        "The sleep study did confirm she gets adequate total sleep time and normal sleep architecture overall — the problem isn't insufficient or disrupted sleep, just an excessive, unrefreshing quantity and persistent difficulty achieving full alertness.",
        "Excessive sleepiness despite at least seven hours of sleep, with at least one of: recurrent lapses into sleep, a main sleep period of more than nine hours that's non-restorative, or difficulty being fully awake after abrupt awakening — occurring at least three times weekly for three months, causing impairment, without cataplexy or other narcolepsy features and not better explained by another sleep, medical, or substance-related condition."
      ],
      teach:"Hypersomnolence disorder is a diagnosis of exclusion: rule out narcolepsy (no cataplexy/REM-related features here), sleep apnea (normal study), and other medical/substance causes. Sleep inertia — prolonged grogginess on waking — is a distinguishing feature from simple sleep deprivation."
    },
    {
      id:"hard-trichotillomania", date:"2026-07-04", answer:"Trichotillomania (Hair-Pulling Disorder)",
      accept:["trichotillomania","hair pulling disorder","trichotillomania hair pulling disorder"],
      clues:[
        "A 33-year-old woman comes in wearing a headscarf she says she \"never takes off in public anymore.\" She's reluctant to explain why at first.",
        "Eventually she discloses that she's been pulling out her own eyelashes and patches of scalp hair for about three years, especially during stressful work calls or late at night while reading.",
        "She describes a mounting urge beforehand and a strange satisfaction in the sensation and ritual of pulling — running her fingers along strands, searching for ones that feel a particular way, before pulling them.",
        "She's tried wigs, scarves, and false eyelashes to hide the resulting bald patches, and has turned down two work presentations rather than risk anyone noticing.",
        "She's made repeated attempts to stop or cut back, including a wellness app and a fidget ring, without lasting success — the urge eventually wins out, usually within a few days.",
        "There's no skin lesion driving this (unlike a dermatological itch), no delusional belief about her hair, and no broader autism-spectrum repetitive behavior pattern — this is isolated to the specific pulling behavior itself.",
        "Recurrent hair pulling resulting in noticeable hair loss, with repeated attempts to decrease or stop the behavior, causing clinically significant distress or impairment — not attributable to another medical or dermatological condition or better explained by another mental disorder."
      ],
      teach:"Trichotillomania belongs to the OCD-related disorders cluster alongside excoriation disorder, sharing the tension-pull/pick-relief cycle. It's reported far more often in clinical samples of women than men, though under-recognition in men due to differing social visibility of hair loss likely affects that ratio. Concealment behaviors (wigs, styling) are common and can delay presentation for years."
    },
    {
      id:"hard-sld", date:"2026-07-05", answer:"Specific Learning Disorder",
      accept:["specific learning disorder","sld","specific learning disorder sld","learning disability","dyslexia"],
      clues:[
        "A bright, articulate 12-year-old is referred by her parents, baffled because she's clearly intelligent in conversation but consistently struggles in one specific area at school.",
        "Despite strong vocabulary and reasoning skills in conversation, her reading is markedly below grade level — she reads slowly, mixes up similar-looking words, and her reading comprehension lags well behind what her listening comprehension would predict.",
        "Standardized testing confirms her reading scores fall substantially below what would be expected for her age and overall intellectual ability, despite normal vision and adequate classroom instruction over several years.",
        "Her math and writing skills, interestingly, are average to above-average for her grade — the difficulty is isolated specifically to reading accuracy, fluency, and comprehension.",
        "She's been getting by through memorization and context clues, compensating well enough that teachers assumed she was simply \"not trying hard enough\" on reading assignments, leading to years of frustration before referral.",
        "Cognitive testing rules out intellectual disability (her overall IQ is in the above-average range) and her hearing and vision are normal — this isn't a global ability issue or sensory impairment, and difficulties have been present since early elementary school.",
        "Difficulties learning and using a specific academic skill (here, reading: inaccurate or slow, effortful word reading; difficulty with reading comprehension) for at least six months despite targeted intervention, with the skill substantially below what's expected for age, interfering significantly with academic performance, and not better explained by intellectual disability, sensory deficits, or inadequate instruction."
      ],
      teach:"SLD is domain-specific — note her intact math/writing — and requires ruling out intellectual disability (which would impair learning more globally) and inadequate instruction or sensory problems. Bright children with SLD frequently compensate for years, delaying diagnosis and getting mislabeled as unmotivated."
    },
    {
      id:"hard-nightmare", date:"2026-07-06", answer:"Nightmare Disorder",
      accept:["nightmare disorder","chronic nightmares"],
      clues:[
        "A 30-year-old comes in exhausted, describing months of disturbing dreams that wake her several nights a week, each one vivid enough that she remembers it in detail the next morning.",
        "The dreams typically involve threats to her safety — being chased, falling, or trapped — and she wakes abruptly from them fully alert and oriented, easily recalling the entire narrative.",
        "She has no history of trauma that would explain a PTSD-related pattern, no flashbacks or intrusive daytime memories, and the content of the dreams doesn't replay any specific real event from her life.",
        "This has been going on nightly or near-nightly for about five months, leaving her dreading sleep and increasingly anxious about bedtime, with resulting daytime fatigue and difficulty concentrating at work.",
        "She's not on any new medication, has no substance use, and a sleep study finds these episodes occurring during REM sleep, distinguishing them from the non-REM sleep terrors her younger brother had as a child — those involved screaming and no dream recall at all, very different from what she experiences.",
        "Her general anxiety levels are unremarkable outside of the dreams themselves; there's no other psychiatric diagnosis driving this, and once awake she reorients quickly and fully, without confusion.",
        "Repeated occurrences of extended, extremely dysphoric, well-remembered dreams that usually involve threats to survival or security, occurring during REM sleep with rapid orientation and full alertness on waking, causing significant distress or impairment, and not attributable to a substance, another medical condition, or better explained by another mental disorder such as PTSD."
      ],
      teach:"Nightmare disorder is distinguished from sleep terrors (non-REM, no recall, occurs in first third of night, common in children) by REM timing, vivid recall, and rapid full orientation on waking. It must also be differentiated from PTSD-related nightmares, which replay a specific traumatic event rather than generic threat content."
    },
    {
      id:"hard-mdd-psychotic", date:"2026-05-17", answer:"Major Depressive Disorder, With Psychotic Features",
      accept:["major depressive disorder with psychotic features","mdd with psychotic features","depression with psychotic features","psychotic depression"],
      clues:[
        "A 54-year-old man is brought to urgent care by his daughter after five days of refusing to leave his bed, eat, or speak more than a few words.",
        "When he does speak, he says his insides have already stopped working — his stomach is \"rotted through\" — and that he can hear a voice telling him he deserves to starve for what he's done, though he cannot say what that is.",
        "The daughter mentions the voice is new — she first noticed him \"talking to himself\" about ten weeks ago, which raises concern for a primary psychotic illness like schizophrenia.",
        "But she also traces back further: for the two months before that, he'd already stopped going to work, slept 14 hours a day, lost 20 pounds, and repeatedly told her he was worthless and a burden — well before any mention of a voice.",
        "Crucially, she has never once heard him describe hallucinations or unusual beliefs during any of his previous stretches of feeling like himself, including a long stable period two years ago.",
        "The order of onset is the deciding factor here — not merely that both mood and psychotic symptoms are present, but whether the psychotic symptoms have ever shown up on their own.",
        "A full major depressive episode — with prominent guilt, psychomotor slowing, and neurovegetative changes — accompanied by delusions and/or hallucinations occurring exclusively during the depressive episode, never during a period of stable mood."
      ],
      teach:"The distinguishing test against schizoaffective disorder or schizophrenia is whether psychotic symptoms have ever occurred in the absence of a mood episode — here they haven't, so the psychosis is mood-congruent and entirely nested within the depressive episode."
    },
    {
      id:"hard-mdd-anxious", date:"2026-05-18", answer:"Major Depressive Disorder, With Anxious Distress",
      accept:["major depressive disorder with anxious distress","mdd with anxious distress","depression with anxious distress"],
      clues:[
        "A 41-year-old accountant schedules an appointment saying she just needs \"something for stress\" before tax season ends.",
        "She describes feeling keyed up and unable to sit still most of the day, a persistent sense that something terrible is about to happen, and a fear that she might lose control — but insists this is just her personality under pressure.",
        "With the racing thoughts and restlessness, a first pass might reach for a primary anxiety disorder — until you ask about her mood and energy directly.",
        "For the past six weeks she's also had almost no interest in things she used to enjoy, poor concentration at work, low energy, and difficulty falling asleep followed by waking at 4am unable to get back to sleep, nearly every day.",
        "She denies any discrete panic attacks and says the dread isn't tied to any specific trigger — it's just \"there,\" layered on top of the flatness and fatigue.",
        "Whether the anxiety is its own diagnosis or a specifier riding on top of another condition depends on which symptom cluster came first and which is driving the picture.",
        "A full major depressive episode marked by prominent feelings of being keyed up or tense, restlessness, difficulty concentrating due to worry, fear that something awful may happen, and a subjective sense of possible loss of control, occurring alongside the core mood and neurovegetative symptoms."
      ],
      teach:"Anxious distress is a specifier, not a separate diagnosis — it flags a depressive episode with prominent tension and worry, which predicts higher suicide risk and often a poorer response to standard antidepressant monotherapy."
    },
    {
      id:"hard-mdd-peripartum", date:"2026-05-19", answer:"Major Depressive Disorder, With Peripartum Onset",
      accept:["major depressive disorder with peripartum onset","mdd with peripartum onset","postpartum depression","peripartum depression"],
      clues:[
        "A 29-year-old is seen at her six-week postpartum visit; she's tearful in the waiting room but tells the nurse everything is \"fine, just tired.\"",
        "When asked more, she says she hasn't felt any real connection to her son since he was born, feels intense guilt for \"not loving him enough,\" and has been crying most days for a month.",
        "She mentions briefly that on two occasions she \"wasn't sure if the baby was real\" — a detail that could suggest a break from reality requiring emergency evaluation for a much more acute postpartum condition.",
        "On follow-up she clarifies this was fleeting, exhausted, sleep-deprived thinking, not a fixed belief — no delusions, no hallucinations, no disorganized behavior, and reality testing is otherwise intact throughout.",
        "This also isn't the fleeting tearfulness that resolves within two weeks — she is five weeks past delivery, sleeping only when the baby sleeps, has lost interest in things she used to enjoy, and had a very similar episode after her first child that lasted four months untreated.",
        "Severity and duration are what separate this from a normal adjustment to a new baby, and the absence of psychotic features is what separates it from the far more urgent diagnosis a clinician should always screen for first.",
        "A full major depressive episode with onset during pregnancy or within four weeks of delivery, without psychotic features, causing clinically significant distress or impairment beyond the transient low mood common in the first two weeks after childbirth."
      ],
      teach:"Always screen postpartum mood complaints for psychotic features (disorganization, delusions, hallucinations) first, since that constitutes a psychiatric emergency; absent those, distinguish ordinary \"baby blues\" (resolving within two weeks) from a true depressive episode by duration, severity, and functional impact."
    },
    {
      id:"hard-mdd-seasonal", date:"2026-05-20", answer:"Major Depressive Disorder, With Seasonal Pattern",
      accept:["major depressive disorder with seasonal pattern","mdd with seasonal pattern","seasonal affective disorder","sad"],
      clues:[
        "A 37-year-old software engineer who relocated from Phoenix to Minneapolis eight months ago comes in describing \"just not feeling like myself\" for the last several weeks.",
        "He reports oversleeping up to 11 hours a night, craving carbohydrates and gaining 12 pounds, low energy, and a heaviness he says feels different from ordinary tiredness.",
        "He attributes it entirely to the move — new job stress, no friends nearby, an unfamiliar city — and the timing lines up neatly with an adjustment problem.",
        "But on closer questioning he recalls two similar stretches in Phoenix in prior winters, both improving reliably by March, both including the same oversleeping-and-carb-craving pattern rather than the insomnia and poor appetite he gets during any other stressful period.",
        "He denies any depressive symptoms at all during spring and summer in any of the past several years, in Phoenix or here, and this episode began within weeks of the days getting shorter, not around the move itself (which was in June).",
        "The recurring, temporally-linked pattern across multiple years — predating this particular relocation — is what needs to be teased apart from an understandable reaction to a hard transition.",
        "A pattern of full depressive episodes with onset in a specific time of year (regularly fall or winter) and full remission at a characteristic time of year (typically spring), present for at least two consecutive years with no non-seasonal episodes during that period, outnumbering any lifetime seasonally-unrelated depressive episodes."
      ],
      teach:"The seasonal pattern specifier requires a temporal relationship documented across at least two years, not just a single hard winter or a stressful relocation — the move here is a red herring since the pattern predates it and tracks day length, not geography or life events."
    },
    {
      id:"hard-pdd", date:"2026-05-21", answer:"Persistent Depressive Disorder (Dysthymia)",
      accept:["persistent depressive disorder","dysthymia","pdd","dysthymic disorder"],
      clues:[
        "A 46-year-old woman comes in only because her therapist, seen briefly for a divorce years ago, insisted she \"get checked out again.\"",
        "She describes feeling flat, low-energy, and pessimistic most days for as long as she can remember — she can't identify a clear starting point — and says with a shrug, \"this is just who I am, I've always been like this.\"",
        "She denies ever having a period of feeling truly well for more than a couple of weeks at a stretch since her twenties, though she's never been hospitalized, never missed significant work, and has held the same job for eleven years.",
        "Given how long-standing and identity-fused this is, it could easily be mistaken for a personality style or trait — low-grade pessimism as \"just her temperament\" rather than anything clinical.",
        "But when screened carefully she endorses poor appetite, low energy, poor concentration, low self-esteem, and feelings of hopelessness present more days than not — and she does recall one especially bad stretch two years ago that, in retrospect, met full criteria for a more severe depressive episode layered on top of her baseline.",
        "What makes this a diagnosis rather than just a personality trait is the chronicity threshold and the specific symptom count — low mood most of the day, more days than not, for years, is not simply how someone is.",
        "Depressed mood for most of the day, more days than not, for at least two years, along with at least two of: poor appetite or overeating, insomnia or hypersomnia, low energy, low self-esteem, poor concentration, or feelings of hopelessness — with no symptom-free period longer than two months during that time."
      ],
      teach:"Chronicity, not severity, is the defining feature — symptoms can be milder than a major depressive episode but must persist at least two years with no gap longer than two months; patients often misattribute this lifelong low-grade misery to personality rather than recognizing it as treatable."
    },
    {
      id:"hard-schizoaffective", date:"2026-05-22", answer:"Schizoaffective Disorder",
      accept:["schizoaffective disorder","schizoaffective"],
      clues:[
        "A 33-year-old woman is admitted after her sister found her rearranging furniture at 3am, convinced she was decoding messages hidden in the wall studs.",
        "Over the following days she also displays pressured speech, decreased need for sleep (up for 40 hours straight), grandiosity — she believes she's been selected to expose a government cover-up — and marked irritability when questioned.",
        "The grandiose delusions and expansive mood look a great deal like a manic episode with psychotic features, and the family confirms two prior hospitalizations for \"mood swings,\" building a strong case for bipolar disorder.",
        "But the team obtains a detailed history: roughly eight weeks ago, well before this manic-looking presentation began, she had two weeks of hearing whispering voices and holding the wall-decoding belief while her mood was, by her sister's account, entirely flat and unremarkable — no elevated mood, no irritability, nothing manic.",
        "This also isn't psychosis confined entirely to mood episodes, since mood symptoms and psychotic symptoms have overlapped for most — though not all — of the total illness course, which argues against a purely psychotic illness like schizophrenia too.",
        "The key is a narrow timing window: at least two weeks where the psychosis ran without any mood episode attached, set against a longer course where mood symptoms were present most of the time.",
        "An uninterrupted period of illness featuring both a major mood episode and active-phase psychotic symptoms, plus delusions or hallucinations for at least two weeks in the absence of a major mood episode at some point in that illness course, with mood symptoms present for the majority of the total duration."
      ],
      teach:"The differential hinges on two separate timing questions: has psychosis ever occurred for two-plus weeks without a mood episode (rules out a mood disorder with psychotic features), and are mood symptoms present for the majority of the illness course (rules out schizophrenia) — both must hold simultaneously."
    },
    {
      id:"hard-brief-psychotic", date:"2026-05-23", answer:"Brief Psychotic Disorder",
      accept:["brief psychotic disorder"],
      clues:[
        "A 26-year-old graduate student is brought to the ER by classmates two days after her dissertation defense was unexpectedly failed and her advisor publicly criticized her work in front of the committee.",
        "Since then she has been telling roommates that the committee planted a device in her laptop to sabotage her, and she's been overheard responding to voices no one else can hear, alternating with crying and incoherent, jumbled speech.",
        "Given the acute onset and clear hallucinations and delusions, an evaluator might reasonably start ruling out a first episode of a chronic primary psychotic illness.",
        "But she has no prior psychiatric history whatsoever, no family history of psychotic illness, and — critically — the identifiable, overwhelming stressor (the failed defense) immediately preceded onset by less than 48 hours.",
        "Toxicology is negative, medical workup is unremarkable, and by day nine of hospitalization, with minimal intervention, she is back to baseline: no delusions, coherent speech, and full insight that her beliefs during the episode \"weren't real.\"",
        "The short total duration and full return to baseline functioning are what will ultimately separate this from anything more chronic — and it's still too early to be fully certain until the calendar plays out.",
        "The sudden onset of one or more of delusions, hallucinations, disorganized speech, or grossly disorganized behavior, lasting at least one day but less than one month, with eventual full return to premorbid level of functioning."
      ],
      teach:"This diagnosis is defined almost entirely by duration and full recovery — under one month with return to baseline — and is often precipitated by a marked psychosocial stressor; if symptoms persist beyond a month, the diagnosis must be reconsidered as schizophreniform disorder or another psychotic illness."
    },
    {
      id:"hard-delusional", date:"2026-05-24", answer:"Delusional Disorder",
      accept:["delusional disorder"],
      clues:[
        "A 58-year-old accountant is referred by his physician after mentioning, almost in passing during a routine physical, that he's certain his wife of thirty years is having an affair.",
        "He functions completely normally otherwise — runs his own small firm, socializes with friends, coaches his grandson's Little League team, and has no other unusual beliefs or perceptual disturbances of any kind.",
        "He describes his evidence in specific, non-bizarre detail: she's started locking her phone, taken two \"work trips\" this past year, and once smelled like unfamiliar cologne — plausible-sounding claims to anyone unfamiliar with the rest of the picture.",
        "The specificity and coherence of his account could make an interviewer wonder if this is simply a marital conflict or reasonable, if mistaken, suspicion rather than a psychiatric matter at all.",
        "But his wife, interviewed separately, is bewildered — there is no affair, and he has been fixated on this single belief for over a year, unmovable by any reassurance or evidence to the contrary, structuring surveillance behaviors (checking her odometer, reviewing credit card statements nightly) around it.",
        "Outside this one encapsulated belief, there is no disorganized thinking, no hallucinations, and no impairment in his broader life — the belief itself, and only the belief, is the entire clinical problem.",
        "At least one non-bizarre delusion (involving situations that could conceivably occur, such as infidelity) for one month or longer, in the absence of past active-phase psychotic symptoms, with functioning not markedly impaired outside the direct impact of the delusion and behavior not obviously odd or bizarre."
      ],
      teach:"The hallmark is an encapsulated, plausible (non-bizarre) fixed belief in someone whose functioning is otherwise preserved — the jealous subtype shown here is one of several (persecutory, erotomanic, grandiose, somatic), and it's easy to misread as ordinary suspicion because the content sounds so believable."
    },
    {
      id:"hard-did", date:"2026-05-25", answer:"Dissociative Identity Disorder",
      accept:["dissociative identity disorder","did","multiple personality disorder"],
      clues:[
        "A 30-year-old woman is referred for psychiatric evaluation after being arrested for shoplifting she has no memory of committing — store surveillance shows her calmly filling a bag, speaking in an unfamiliar clipped voice and using a different posture than she uses now.",
        "Given the pending legal charges, the evaluating team's first working hypothesis is that the memory gap is being exaggerated or fabricated to avoid responsibility — a reasonable concern whenever amnesia surfaces in a legal context.",
        "But her employer of six years and her sister, interviewed independently and before either knew of the legal issue, both describe having noticed — for over a decade — periods where she \"goes by a different name,\" uses noticeably different handwriting, and later has no recollection of hours or sometimes days.",
        "She reports finding unfamiliar clothing in her closet, receipts for purchases she doesn't remember making, and gaps in her employment file that her boss has quietly covered for, going back to her teenage years — long before any legal jeopardy existed.",
        "On structured interview, at least two distinct, recurrent identity states emerge — one more guarded and formal, one impulsive and younger-sounding — each with its own consistent name, mannerisms, and self-referential memories, corroborated across multiple informants over many years.",
        "The pattern's duration (over a decade), its independent corroboration by people who had no stake in the legal outcome, and its consistency across contexts unrelated to the arrest are what rule out simple fabrication for secondary gain.",
        "The presence of two or more distinct personality states, each with its own relatively enduring pattern of perceiving and relating to the world, accompanied by recurrent gaps in recall of everyday events, personal information, or traumatic events too extensive to be explained by ordinary forgetting — not attributable to substance use or a broader cultural or religious practice."
      ],
      teach:"Malingering must be seriously considered whenever dissociative amnesia appears in a forensic context, but longitudinal, cross-informant corroboration predating any legal stakes — as gathered here from her employer and sister — is what distinguishes a genuine dissociative disorder from fabrication."
    },
    {
      id:"hard-bpd", date:"2026-05-26", answer:"Borderline Personality Disorder",
      accept:["borderline personality disorder","bpd"],
      clues:[
        "A 24-year-old woman presents to the ER for the third time this year after cutting her forearms, this time following a breakup that happened four hours earlier.",
        "She describes her relationships as intense and consuming from the start — she was certain her ex-boyfriend was \"the one\" after three weeks, and now describes him, in the same conversation, as both the love of her life and someone who \"never cared about me at all.\"",
        "She reports a chronic feeling of emptiness, rapidly shifting mood that can swing from fine to furious to suicidal within hours in response to perceived slights, and says she genuinely doesn't know who she is outside of whoever she's dating.",
        "The mood swings-within-hours pattern could initially suggest rapid-cycling bipolar disorder, especially paired with impulsivity.",
        "But careful history shows these shifts are reactive — always tied to an interpersonal trigger, real or feared abandonment — lasting hours, not the sustained days-to-weeks mood episodes with distinct neurovegetative changes seen in a mood disorder, and she's never had a true manic or hypomanic episode.",
        "The pattern is pervasive across nearly every close relationship she's had since adolescence, not confined to discrete episodes — friendships, family, and romantic partners have all followed the same idealize-then-devalue arc.",
        "A pervasive pattern, present since early adulthood, of instability in relationships, self-image, and emotions, along with marked impulsivity, including frantic efforts to avoid abandonment, unstable and intense relationships alternating between idealization and devaluation, identity disturbance, recurrent suicidal or self-harming behavior, affective instability reactive to circumstances, chronic emptiness, and difficulty controlling anger."
      ],
      teach:"Reactive, interpersonally-triggered mood shifts lasting hours, not sustained days-to-weeks episodes, is the key feature separating this from bipolar disorder — the affective instability here is characterological and trait-level, not episodic."
    },
    {
      id:"hard-npd", date:"2026-05-27", answer:"Narcissistic Personality Disorder",
      accept:["narcissistic personality disorder","npd"],
      clues:[
        "A 45-year-old executive schedules therapy saying his team at work is \"toxic\" and he needs help managing them.",
        "He spends most of the first session describing how his direct reports \"constantly fail to appreciate\" the vision he brought to the company, how a recent award went to a colleague who he says \"doesn't deserve a fraction of the credit,\" and how exhausting it is to be surrounded by people who can't operate at his level.",
        "On the surface this reads like a workplace conflict or possibly burnout — a competent, high-achieving leader dealing with a genuinely difficult team, which is exactly how he frames it himself.",
        "But as the history unfolds, a pattern emerges: three prior jobs ended after conflicts he describes identically. His wife, in a couples session he reluctantly agrees to, describes him needing constant praise, becoming coldly dismissive of her feelings when she's upset, and being visibly irritated when friends' successes come up in conversation.",
        "He shows little curiosity about how his own behavior might contribute to the pattern, and when asked directly how a report might describe working for him, he says, \"honestly, they're lucky to work for me,\" without apparent awareness of how that lands.",
        "He has almost no insight that the common denominator across every version of this story is himself — the presenting complaint about others is, underneath, a window into his own pattern.",
        "A pervasive pattern of grandiosity, need for admiration, and lack of empathy, beginning by early adulthood, including a grandiose sense of self-importance, preoccupation with fantasies of unlimited success, belief in being special and only understandable by other high-status people, need for excessive admiration, sense of entitlement, interpersonally exploitative behavior, lack of empathy, envy of others or belief that others are envious, and arrogant attitudes."
      ],
      teach:"Patients rarely present asking to be evaluated for this directly — the complaint is almost always framed around other people's failings, and the diagnostic work is recognizing the self-serving pattern underneath a story the patient presents as being about someone else."
    },
    {
      id:"hard-histrionic-pd", date:"2026-05-28", answer:"Histrionic Personality Disorder",
      accept:["histrionic personality disorder","hpd"],
      clues:[
        "A 34-year-old woman is referred by her primary care doctor for \"excessive worry about her health,\" though she arrives to the appointment in a strikingly dramatic outfit and greets the psychiatrist with a hug.",
        "She describes her life in vivid, theatrical terms — a recent minor fender-bender becomes \"the most traumatic day of my life,\" and she cries dramatically while recounting it, then laughs brightly moments later when the subject shifts to a new relationship.",
        "The rapid emotional shifts and intensity could initially suggest an affective instability disorder like borderline personality, especially given her description of several short, intense romances.",
        "But unlike a pattern built around abandonment fears and chronic emptiness, her relationships aren't unstable so much as she seems most alive when she is the center of attention in them — she describes needing to be \"the main character\" wherever she goes, dresses provocatively without really thinking about it, and is uncomfortable and restless whenever the conversational focus shifts away from her.",
        "She characterizes casual acquaintances as \"my closest friend in the whole world\" after a single dinner, and her emotional displays, while intense, shift rapidly and lack real depth — she cannot recall specific details of the \"traumatic\" accident beyond how upset she was.",
        "The throughline isn't fear of abandonment but a pervasive need to be the emotional center of every room, expressed through theatricality and appearance rather than through unstable identity or chronic emptiness.",
        "A pervasive pattern of excessive emotionality and attention-seeking beginning by early adulthood, including discomfort when not the center of attention, inappropriately seductive or provocative behavior, rapidly shifting and shallow emotional expression, consistent use of physical appearance to draw attention, an impressionistic and vague speaking style, self-dramatization, suggestibility, and considering relationships more intimate than they actually are."
      ],
      teach:"The overlap with borderline personality disorder is real — both feature intense, shifting emotion — but the organizing feature here is attention-seeking and theatricality rather than abandonment fear, chronic emptiness, and self-harm."
    },
    {
      id:"hard-avoidant-pd", date:"2026-05-29", answer:"Avoidant Personality Disorder",
      accept:["avoidant personality disorder","apd"],
      clues:[
        "A 27-year-old man is referred after telling his primary care doctor he's \"too anxious to date or make friends.\"",
        "He describes intense fear of being judged in social situations, avoiding work happy hours and turning down a promotion because it would require presenting to groups — a picture that initially sounds like textbook social performance anxiety.",
        "If the fear were confined to performance or scrutiny situations — public speaking, being watched while doing something — a discrete social anxiety around specific triggers would be the leading explanation.",
        "But on further history, the avoidance isn't limited to performance situations at all: he has never had a close friend outside his brother, describes feeling fundamentally inadequate and unlikable since childhood, and avoids even low-stakes interactions like small talk with a barista for fear of saying something embarrassing.",
        "He wants close relationships badly and is lonely, but won't pursue them \"unless I'm certain I'll be liked first\" — a pattern consistent since adolescence, well before any specific performance-based trigger, and present in every relational domain, not just work presentations.",
        "The pervasiveness across his entire life and relational world, rather than confinement to particular performance or scrutiny situations, is what should shift the read from a circumscribed anxiety condition to something broader and trait-level.",
        "A pervasive pattern, present since early adulthood, of social inhibition, feelings of inadequacy, and hypersensitivity to negative evaluation, including avoidance of occupational activities involving interpersonal contact, unwillingness to get involved with people unless certain of being liked, restraint in intimate relationships for fear of shame, preoccupation with being criticized, inhibition in new interpersonal situations due to feelings of inadequacy, self-view as socially inept and inferior, and reluctance to take personal risks for fear of embarrassment."
      ],
      teach:"The overlap with social anxiety disorder is substantial and they frequently co-occur, but this diagnosis requires a pervasive, trait-level pattern of inadequacy and inhibition across essentially all relationships and life domains, not fear restricted to specific performance or scrutiny situations."
    },
    {
      id:"hard-dependent-pd", date:"2026-05-30", answer:"Dependent Personality Disorder",
      accept:["dependent personality disorder","dpd"],
      clues:[
        "A 52-year-old woman is brought in by her adult daughter, who says her mother has been unable to function since her husband of thirty years died two months ago.",
        "She reports being unable to decide what to eat, wear, or watch on television without calling her daughter first, and has not made a single financial decision in three decades without her husband's direct input — she doesn't know how to access their bank accounts.",
        "Given the recent loss, this could initially look like an expected, if severe, grief reaction — someone who built her whole world around a spouse now struggling in the immediate aftermath.",
        "But the daughter clarifies this isn't new: her mother has needed constant reassurance and had someone else take responsibility for major life decisions for as long as she can remember, going back well before her father's death — she stayed in a demanding, unpleasant job for fifteen years because her husband told her to, and has never lived alone or had a close friend she didn't defer to entirely.",
        "Within three weeks of the funeral, she was already anxiously asking her daughter to move in and \"tell me what to do with my life now,\" expressing urgent, almost frantic need to secure another person to organize her decisions.",
        "The lifelong pattern of deferring judgment and urgently seeking a replacement caretaking figure — not the loss itself — is the clinical picture, and grief alone wouldn't explain a decades-long history predating this death.",
        "A pervasive and excessive need to be taken care of, leading to submissive and clinging behavior and fears of separation, beginning by early adulthood, including difficulty making everyday decisions without excessive reassurance, needing others to assume responsibility for major life areas, difficulty expressing disagreement for fear of losing support, difficulty initiating projects independently, going to excessive lengths to obtain nurturance from others, feeling helpless when alone, urgently seeking another relationship as a source of care when one ends, and unrealistic preoccupation with fears of being left to take care of oneself."
      ],
      teach:"Grief after losing a caretaking spouse can mimic this presentation, but the diagnosis requires a longstanding pattern of submissiveness and decision-avoidance predating the loss — here documented across thirty years of marriage, not just the acute bereavement period."
    },
    {
      id:"hard-ocpd", date:"2026-05-31", answer:"Obsessive-Compulsive Personality Disorder",
      accept:["obsessive-compulsive personality disorder","ocpd","obsessive compulsive personality disorder"],
      clues:[
        "A 39-year-old attorney is referred by his firm's EAP after colleagues complained he missed a major filing deadline because he refused to submit a brief he considered \"not yet perfect.\"",
        "He describes spending nights reorganizing his files by a system only he understands, redoing junior associates' work rather than delegating because \"they won't do it right,\" and being unable to enjoy a vacation without bringing three folders of case materials, \"just in case.\"",
        "The rigidity, checking, and perfectionism could initially raise concern for a condition centered on intrusive thoughts driving repetitive behaviors — the checking and redoing sound almost ritualistic.",
        "But on careful interview, he denies any unwanted, intrusive thoughts and denies that his reorganizing or redoing work is aimed at neutralizing anxiety from a specific mental image or fear — he does it because he genuinely believes his way is the objectively correct way, and it doesn't distress him; it distresses everyone around him.",
        "He describes being this way since law school, values work over relationships to the point that his marriage ended over it two years ago, is notoriously stingy even with himself (he still drives a car with 220,000 miles because replacing it feels wasteful), and cannot throw away outdated legal reference books \"because I might need them.\"",
        "The absence of true obsessions and compulsions — no intrusive thoughts he's trying to neutralize, no ego-dystonic anxiety driving the behavior — is what separates this ingrained way of operating from a symptom-based anxiety condition.",
        "A pervasive pattern of preoccupation with orderliness, perfectionism, and control at the expense of flexibility and efficiency, beginning by early adulthood, including preoccupation with details and rules that obscures the larger point of an activity, perfectionism that interferes with task completion, excessive devotion to work at the expense of leisure and relationships, over-conscientiousness about morals or ethics, inability to discard worthless objects, reluctance to delegate, miserly spending, and rigidity and stubbornness."
      ],
      teach:"Unlike the anxiety disorder it's easily confused with, this pattern is ego-syntonic — the person believes their rigid standards are simply correct, feels little internal distress about the behaviors themselves, and lacks the true obsessions that drive compulsions in the disorder it superficially resembles."
    },
    {
      id:"hard-paranoid-pd", date:"2026-06-01", answer:"Paranoid Personality Disorder",
      accept:["paranoid personality disorder","ppd"],
      clues:[
        "A 48-year-old man comes to therapy at his sister's urging after cutting off contact with most of his extended family.",
        "He explains, with detailed and organized reasoning, that his brother-in-law has been \"badmouthing him\" at family gatherings for years, that a longtime neighbor \"keeps track\" of when he leaves the house, and that he no longer uses his company email because he suspects IT reads his messages selectively to build a case against him.",
        "The organized, specific, and somewhat elaborate nature of these suspicions — especially the belief about being surveilled and having a case built against him — could initially raise concern for a delusional or other psychotic process.",
        "But when pressed, he acknowledges these are inferences and suspicions based on ambiguous evidence (overheard fragments, a coworker's odd glance) rather than fixed, unshakeable convictions — he'll concede, with visible reluctance, that he \"can't prove it, not really,\" and there's no formal thought disorder, no hallucinations, and no bizarre or fantastical content.",
        "This pattern is longstanding, not new — he's held grudges for over a decade against former friends over perceived slights, reads hidden threatening meaning into neutral comments, and is quick to counterattack when he perceives even mild criticism, but he functions fully at work and has no history of a psychotic break.",
        "The key distinction is that his suspiciousness, however pervasive and impairing, stops short of the fixed, reality-detached conviction that would mark a break from reality — this is a lifelong stance toward the world, not an episode.",
        "A pervasive pattern of distrust and suspiciousness such that others' motives are interpreted as malevolent, beginning by early adulthood, including unjustified suspicion that others are exploiting or deceiving them, preoccupation with unjustified doubts about loyalty of friends, reluctance to confide in others for fear information will be used against them, reading hidden demeaning or threatening meanings into benign remarks, persistent grudge-holding, perceiving attacks on character not apparent to others and reacting angrily, and recurrent unjustified suspicions regarding partner fidelity."
      ],
      teach:"The line between this and a genuine psychotic disorder is whether the suspicious beliefs are fixed and impervious to any doubt (a true delusion) or remain, however rigidly held, within the realm of exaggerated but revisable suspicion — reality testing stays intact here."
    },
    {
      id:"hard-odd", date:"2026-06-02", answer:"Oppositional Defiant Disorder",
      accept:["oppositional defiant disorder","odd"],
      clues:[
        "A 13-year-old boy is brought in by his mother after his school called for the third time this semester about \"defiant behavior.\"",
        "Teachers describe him as routinely arguing with adults over minor rules, deliberately doing the opposite of what's asked, and losing his temper several times a week over small frustrations — he was recently suspended for refusing to stop talking after being asked twice.",
        "Given the frequency and intensity of the conflict with authority figures, a school administrator has already floated a more serious behavioral diagnosis involving disregard for others' rights, especially after he was accused of \"bullying\" a classmate.",
        "On closer review, that incident was verbal — calling a classmate names during an argument — and there is no history of physical aggression toward people or animals, no property destruction, no theft, and no serious rule violations like running away or truancy.",
        "His mother describes him as spiteful and easily annoyed at home too — he deliberately annoys his younger sister, blames her for his own mistakes, and has been touchy and quick to anger since about age nine — but he's never been physically aggressive with her either, and he does have friends and does reasonably well academically when engaged.",
        "The absence of aggression toward people or animals, destruction of property, deceitfulness or theft, and serious rule violations is what keeps this in a milder, non-aggressive category of the differential, despite how disruptive the argumentative pattern is.",
        "A pattern lasting at least six months of angry/irritable mood, argumentative/defiant behavior, or vindictiveness — including frequent loss of temper, touchiness, anger and resentment, arguing with authority figures, active defiance of rules, deliberately annoying others, blaming others for one's own mistakes, and being spiteful at least twice in six months — without the more severe rights-violating behaviors seen in a related, more serious conduct-focused diagnosis."
      ],
      teach:"The differential from the more serious diagnosis it's often confused with hinges entirely on the absence of aggression toward people/animals, property destruction, deceitfulness/theft, and serious rule violations — this pattern is about irritability, defiance, and vindictiveness, not violation of others' basic rights."
    },
    {
      id:"hard-conduct", date:"2026-06-03", answer:"Conduct Disorder",
      accept:["conduct disorder","cd"],
      clues:[
        "A 15-year-old boy is evaluated at the request of juvenile court after being caught breaking into a neighbor's garage for the second time this year.",
        "The probation officer's file also documents him setting a small fire in a dumpster behind his school last spring, and a physical altercation with a classmate that required the other student to get stitches.",
        "His mother initially frames this as \"just teenage rebellion\" — he argues with her constantly, breaks curfew, and has always been strong-willed since childhood, which on its own could sound like garden-variety adolescent defiance and irritability.",
        "But the pattern goes well beyond argumentativeness: over the past year he has also stolen from a convenience store using a forged ID, been truant from school for weeks at a time, broken into two other properties besides the garage, and has shown little remorse when confronted, describing the classmate he injured as having \"deserved it.\"",
        "There's also a history of hurting a neighbor's cat as a younger child, which his mother initially dismissed as \"kids being curious,\" but which in retrospect fits a broader pattern rather than an isolated incident.",
        "The presence of aggression toward people and animals, deliberate property destruction, deceitfulness or theft, and serious rule violations — not just conflict with parental authority — is what pushes this past a milder oppositional pattern into a more serious category.",
        "A repetitive and persistent pattern of behavior violating the basic rights of others or major age-appropriate societal norms, over the past twelve months, including aggression to people or animals, destruction of property, deceitfulness or theft, and serious violations of rules such as running away or truancy before age thirteen."
      ],
      teach:"This diagnosis requires actual violation of others' rights or major societal norms — aggression, destruction, deceit, or serious rule-breaking — which distinguishes it from the milder, non-rights-violating irritability and defiance seen in its more common but less severe relative; untreated, it's also a known precursor to antisocial personality disorder in adulthood."
    },
    {
      id:"hard-ied", date:"2026-06-04", answer:"Intermittent Explosive Disorder",
      accept:["intermittent explosive disorder","ied"],
      clues:[
        "A 36-year-old warehouse supervisor is referred after an incident where he put his fist through a break-room wall following what a coworker described as \"a completely minor disagreement\" about a shift schedule.",
        "He describes the episode with genuine embarrassment: one moment he was mildly annoyed, and within seconds he was screaming and hitting the wall, feeling almost outside himself, before \"coming back down\" within a few minutes and feeling immediate remorse and shame.",
        "Given how out-of-character and severe the outburst was, and his description of feeling \"outside himself,\" an evaluator might first wonder about an underlying mood disorder with irritable features, or even a dissociative process.",
        "But he denies any sustained mood disturbance before or after — no days of elevated or depressed mood, no memory gaps, and he's fully oriented and continuous in his sense of self throughout, just overtaken briefly by rage disproportionate to the trigger.",
        "This is not an isolated event: he counts at least a dozen similar outbursts over the past year alone — screaming matches, punched walls and doors, one instance of throwing a chair — each lasting minutes, each grossly out of proportion to whatever minor provocation set it off, and none planned or aimed at achieving any concrete goal like intimidation for a purpose.",
        "The recurrence, brevity, disproportionality, and lack of premeditation across many discrete episodes — rather than a sustained mood state or a single explainable event — is the pattern to focus on.",
        "Recurrent behavioral outbursts representing failure to control aggressive impulses, manifested as verbal aggression or physical aggression toward people, animals, or property occurring twice weekly on average for three months, or three more severe destructive episodes within a year, with aggressiveness grossly out of proportion to the provocation and outbursts not premeditated or committed to achieve a tangible objective."
      ],
      teach:"The episodes must be impulsive, not premeditated, and grossly disproportionate to the trigger — this is a diagnosis of recurrent discrete outbursts, not a sustained mood disturbance, and it's given only after other explanations such as a mood, psychotic, or substance-related cause have been ruled out."
    },
    {
      id:"hard-kleptomania", date:"2026-06-05", answer:"Kleptomania",
      accept:["kleptomania"],
      clues:[
        "A 44-year-old woman, recently started on an antidepressant for a low mood that began after a job loss eight months ago, discloses to her new psychiatrist — almost as an aside — that she's been shoplifting small items from drugstores for years.",
        "Given the recent depressive episode, the timing looks suspicious: could the stealing be a new coping behavior tied to the depression, perhaps a way of self-soothing or a symptom of impaired judgment during a mood episode?",
        "She herself offers this explanation too, saying \"I guess I've just been more stressed lately, that's probably why,\" which would make it a straightforward byproduct of her depressive episode rather than its own condition.",
        "But on careful history, the stealing long predates the depression — she can trace it back over fifteen years, well before any mood symptoms, and describes a very specific internal sequence each time: rising tension beforehand that has nothing to do with wanting the item (she often steals things she doesn't need or even like — travel-size lotions, cheap keychains), followed by a distinct sense of relief or gratification at the moment of taking it, then guilt afterward.",
        "She has never sold the items, doesn't need them financially (she has a stable income even now), isn't stealing out of anger or to prove a point, and typically discards or forgets about the items within days — the act itself, not the object, is clearly the point.",
        "Separating this from an act of financial need, an angry or retaliatory act, or simply a byproduct of her current depression requires tracking the tension-then-relief cycle and its long history independent of her mood state.",
        "Recurrent failure to resist impulses to steal objects not needed for personal use or monetary value, with increasing tension immediately before the theft and pleasure, gratification, or relief at the time of committing it — not committed out of anger, revenge, in response to a delusion or hallucination, or better explained by another disruptive behavior disorder."
      ],
      teach:"Comorbid depression is common and can look like it's driving the behavior, but the diagnostic core is the tension-arousal-relief cycle tied to the act of stealing itself, independent of need, value, or mood state, and it typically predates any concurrent mood episode rather than being caused by it."
    },
    {
      id:"hard-gender-dysphoria", date:"2026-06-06", answer:"Gender Dysphoria",
      accept:["gender dysphoria","gd"],
      clues:[
        "A 16-year-old is brought to an adolescent medicine clinic by a parent who says their child has been \"increasingly withdrawn\" over the past year and wants a general checkup.",
        "In a private portion of the visit, the teen — assigned female at birth — describes a persistent, years-long discomfort with having a female body, particularly since puberty began: binding the chest daily despite physical discomfort, avoiding mirrors, and feeling a strong, consistent wish to be seen and addressed as a boy.",
        "Given the recent withdrawal and low mood, a first read might frame this primarily as an adolescent depressive or social anxiety presentation, with statements about gender treated as secondary to the mood symptoms or a passing developmental phase.",
        "But on further history, this isn't recent or mood-dependent — the teen recalls discomfort with being treated as a girl going back to early elementary school, consistently preferring traditionally boys' clothing and activities, and the current withdrawal and low mood appear to be a consequence of the distress and social difficulty around this incongruence, not its cause.",
        "The teen articulates a clear, stable, and strong desire to be treated as a boy, a wish to be rid of physical sex characteristics like breast development and menstruation, and a wish for a different primary and secondary sex characteristic profile altogether — persistent across multiple settings (home, school, with close friends) for more than the past six months.",
        "What matters clinically is the marked incongruence between experienced gender and assigned sex, and the clinically significant distress or impairment that comes with it — not whether the feelings are new, whether they coincide with a mood episode, or whether adults around the teen find them easy to accept.",
        "A marked incongruence between one's experienced or expressed gender and assigned sex, lasting at least six months, evidenced by a strong desire to be treated as the other gender, a strong desire for the primary and/or secondary sex characteristics of the experienced gender, and a strong dislike of one's own sexual anatomy, associated with clinically significant distress or impairment in functioning."
      ],
      teach:"The diagnosis describes clinically significant distress arising from incongruence between experienced and assigned gender — it is not a statement that being transgender itself is pathological, and comorbid depression or anxiety in these patients is best understood as often secondary to social difficulty and minority stress rather than the root cause of the incongruence."
    },
    {
      id:"hard-somatic", date:"2026-06-07", answer:"Somatic Symptom Disorder",
      accept:["somatic symptom disorder","ssd"],
      clues:[
        "A 51-year-old woman arrives for a new-patient intake carrying a folder thick with records from four different gastroenterologists, two cardiologists, and a rheumatologist she's seen over the past three years.",
        "She describes chronic abdominal pain, fatigue, and joint aches that have never been explained by any test — extensive workups, including endoscopy, colonoscopy, and full autoimmune panels, have all been unremarkable or shown only minor incidental findings.",
        "Given the negative workups, a tempting shortcut is to conclude there's simply nothing medically wrong and the complaints can be dismissed or attributed entirely to symptom exaggeration or health anxiety about one specific feared disease.",
        "But she isn't primarily afraid of having a specific undiagnosed illness (she doesn't fixate on cancer or any particular diagnosis) — instead, she spends hours daily researching her symptoms, has quit two jobs because the pain felt too disabling to work through, and describes her life as organized entirely around monitoring and managing her body.",
        "When a new doctor is not immediately responsive to her concerns, she becomes anxious and moves on to another specialist within weeks — a pattern of doctor-shopping she doesn't see as unusual, insisting each new doctor \"just isn't looking hard enough\" and showing little openness to the idea that psychological factors play any role.",
        "The diagnostic weight here isn't on whether her pain is \"real\" (it is, subjectively, and may partly reflect genuine sensitization) — it's on the disproportionate thoughts, anxiety, and time devoted to the symptoms regardless of whether a medical explanation is ever found.",
        "One or more somatic symptoms that are distressing or disrupt daily life, accompanied by excessive thoughts, feelings, or behaviors related to the symptoms — such as disproportionate and persistent thoughts about their seriousness, persistently high anxiety about health, or excessive time and energy devoted to the symptoms — persisting for more than six months, regardless of whether a medical cause is identified."
      ],
      teach:"The diagnosis doesn't require symptoms to be medically unexplained — it can coexist with a real medical condition — the defining feature is a disproportionate cognitive, emotional, and behavioral response to bodily symptoms, and doctor-shopping with low insight into any psychological contribution is a classic presentation."
    },
    {
      id:"hard-delirium", date:"2026-06-08", answer:"Delirium",
      accept:["delirium"],
      clues:[
        "A 61-year-old man is brought to the ER by police after being found in a parking lot, shouting at people who weren't there and swinging at paramedics who tried to approach him.",
        "In the ER he is tremulous, diaphoretic, and tachycardic, with blood pressure elevated well above his baseline; his attention is markedly impaired — he cannot maintain focus on a simple question for more than a few seconds and drifts off mid-sentence before startling back into agitation.",
        "The florid hallucinations, agitation, and disorganized, combative behavior in a previously psychiatrically-unremarkable-seeming man could easily be mistaken for a first psychotic break requiring an inpatient psychiatric admission.",
        "But his sister, reached by phone, reports he has been drinking heavily every day for over a decade and that she hasn't been able to reach him for the past three days — coinciding with when his liquor supply, by her account, would have run out.",
        "His symptoms are also markedly fluctuating rather than fixed — over the next several hours he cycles between lucid, appropriately answering questions, and then abruptly disoriented, not knowing what city he's in, then agitated again, a pattern that doesn't fit the more stable, consistent presentation of a primary psychotic illness.",
        "The rapid onset over hours to days, the fluctuating course within a single day, the markedly impaired attention, and a clear physiological trigger together point away from a primary psychiatric break and toward something with a defined medical cause and, often, a defined resolution once treated.",
        "A disturbance in attention and awareness that develops over a short period, represents a change from baseline, tends to fluctuate in severity over the course of a day, and is accompanied by an additional disturbance in cognition, with evidence that it is a direct physiological consequence of a medical condition, substance intoxication or withdrawal, or another identifiable cause."
      ],
      teach:"Fluctuating attention and awareness over hours, an acute time course, and a clear physiological driver (here, alcohol withdrawal) distinguish this from a primary psychotic disorder; the hyperactive, agitated subtype shown here is easy to mistake for a psychiatric emergency rather than the medical emergency it actually is."
    },
    {
      id:"hard-major-ncd", date:"2026-06-09", answer:"Major Neurocognitive Disorder (Dementia)",
      accept:["major neurocognitive disorder","dementia","major ncd"],
      clues:[
        "A 58-year-old architect is referred by his internist for \"worsening depression\" after his wife reported he's become withdrawn, has stopped managing the firm's finances, and seems \"checked out\" for the past year.",
        "He describes low motivation and difficulty concentrating, and given his age and the recent retirement of his business partner, his internist's working assessment has been a mood disorder tied to this major life transition — arguably a reasonable read of a middle-aged man struggling after losing his professional identity.",
        "A trial of an antidepressant six months ago produced no real improvement, which could simply mean the wrong medication or dose, keeping the depression hypothesis alive without much scrutiny.",
        "But his wife, pressed for specifics, describes something more concerning than low mood: he got lost driving to a client site he'd visited dozens of times, has started repeating the same questions within an hour, forgot how to use the coffee maker he's used daily for fifteen years, and recently left the stove on overnight.",
        "On bedside cognitive testing he shows clear deficits in recent memory and executive function — well beyond what would be expected from depression alone — and his wife confirms she's had to start managing bill payments and appointments entirely herself, something he'd always handled independently before.",
        "The unusually young age for this presentation is exactly why it gets missed or misattributed to mood or stress for so long — but the objective, progressive functional decline in independence, not just subjective low mood, is what should have redirected the workup much earlier.",
        "Significant cognitive decline from a previous level of performance in one or more cognitive domains, based on concern of the individual, an informant, or a clinician plus objective impairment on testing, sufficient to interfere with independence in everyday activities, not occurring exclusively during delirium, and not better explained by another mental disorder."
      ],
      teach:"Early-onset presentations are frequently misattributed to depression, midlife stress, or burnout precisely because they occur outside the expected age range — the distinguishing clue is objective, progressive loss of functional independence rather than purely subjective low mood, and antidepressant non-response should prompt cognitive testing."
    },
    {
      id:"hard-ptsd-dissoc", date:"2026-06-10", answer:"Post-Traumatic Stress Disorder, With Dissociative Symptoms",
      accept:["post-traumatic stress disorder with dissociative symptoms","ptsd with dissociative symptoms","ptsd dissociative subtype"],
      clues:[
        "A 29-year-old woman is referred for evaluation eight months after surviving a serious car accident that killed a close friend who was in the passenger seat.",
        "She reports recurrent, intrusive memories of the crash, nightmares several times a week, avoidance of driving or even being a passenger, and a persistent belief that she \"should have done something\" to prevent it, alongside irritability and an exaggerated startle response to sudden sounds.",
        "This core picture — reexperiencing, avoidance, negative beliefs, and hyperarousal following a life-threatening trauma — would, on its own, already be sufficient for the standard diagnosis, and a clinician might reasonably stop the workup there.",
        "But a more detailed interview reveals something further: several times a week, she describes moments where she feels like she's \"watching herself from outside her own body,\" and other moments where the world around her feels unreal, \"like looking through glass\" or \"underwater,\" lasting minutes at a time, most often triggered by reminders of the crash.",
        "These experiences are not a separate identity taking over, and she retains full awareness and later recall of them — they aren't gaps in memory but altered, distanced experiences of self and surroundings, occurring specifically in the context of her trauma symptoms rather than randomly.",
        "These additional depersonalization and derealization experiences don't change the core diagnosis, but they do specify a distinct presentation associated with a somewhat different clinical course and treatment consideration.",
        "Exposure to actual or threatened death involving intrusion symptoms, avoidance, negative alterations in cognition and mood, and marked alterations in arousal and reactivity persisting more than one month, accompanied by persistent or recurrent experiences of feeling detached from one's own mental processes or body, and/or experiences of unreality of surroundings."
      ],
      teach:"This is a specifier, not a separate diagnosis — roughly 15 to 30 percent of patients with this condition also show depersonalization/derealization, and this subgroup has been associated with distinct patterns of threat processing and, in some studies, different treatment response, making it clinically worth flagging even though it doesn't change the base diagnosis."
    },
    {
      id:"hard-acute-stress", date:"2026-06-11", answer:"Acute Stress Disorder",
      accept:["acute stress disorder","asd"],
      clues:[
        "A 35-year-old bank teller is seen twelve days after an armed robbery during which she was held at gunpoint for several minutes.",
        "She describes intrusive, unwanted memories of the robbery several times a day, has been unable to return to the bank, avoids anything resembling the getaway car's color, and startles violently at loud noises — a picture that on its face looks like a textbook trauma response requiring the standard post-traumatic diagnosis.",
        "The symptom content itself — reexperiencing, avoidance, hyperarousal, negative mood — closely mirrors that more familiar and more commonly discussed diagnosis, and it would be an easy, reasonable-sounding label to reach for immediately.",
        "She also describes moments of feeling \"spaced out and unreal\" since the event, and some patchy memory of the minutes right after the gun was lowered, both of which fit under the same broader umbrella of trauma-related and dissociative symptoms.",
        "The critical detail is the calendar: it has been twelve days since the robbery, and the symptoms began within the first three days.",
        "Whichever diagnosis fits will change depending entirely on what happens between now and roughly the three-week mark — before that point, only one of the two closely related diagnoses is even possible to assign.",
        "Exposure to actual or threatened death, involving intrusion symptoms, dissociative symptoms, avoidance, and marked arousal symptoms, with symptom duration of three days to one month following trauma exposure."
      ],
      teach:"The symptom clusters substantially overlap with the more chronic, better-known trauma diagnosis it's frequently confused with, but this one is defined by a strict duration window (3 days to 1 month) — if symptoms persist past a month, the diagnosis converts to the other; before three days, neither diagnosis can yet be assigned."
    },
    {
      id:"hard-ocd", date:"2026-06-12", answer:"Obsessive-Compulsive Disorder",
      accept:["obsessive-compulsive disorder","ocd","obsessive compulsive disorder"],
      clues:[
        "A 24-year-old graduate student seeks help for \"constant anxiety\" that she says has no obvious trigger and doesn't respond to typical stress management.",
        "On the surface there's nothing to observe — no hand-washing, no visible checking, no arranging objects — which is part of why her college counseling center previously reassured her this \"probably isn't OCD\" and treated her for generalized anxiety with limited benefit.",
        "The absence of any visible ritual, plus prominent free-floating worry, made generalized anxiety disorder the obvious first read for two different clinicians.",
        "But pressed further, she describes something more specific: sudden, unwanted, intrusive images of harming people she loves — images that horrify her and feel completely alien to her actual wishes — occurring dozens of times a day, each followed by an internal ritual: silently repeating a specific \"safe\" phrase exactly five times, or mentally reviewing the past hour in detail to reassure herself she didn't actually act on the image.",
        "She has never disclosed this to anyone before, terrified it means something dangerous or immoral about her character, and the mental reviewing and phrase-repeating rituals now consume more than three hours of her day, though entirely inside her head where no one can observe them.",
        "The presence of specific, unwanted, ego-dystonic intrusive content paired with a covert but genuinely ritualistic mental response — not merely diffuse worry — is what was missed by two prior evaluations that looked for visible behaviors and found none.",
        "Recurrent, intrusive, unwanted thoughts, urges, or images that cause marked anxiety, which the person attempts to suppress or neutralize with another thought or covert action, plus repetitive mental acts performed according to rigid rules aimed at reducing distress or preventing a feared event, consuming more than an hour a day and causing significant distress or impairment, with the person recognizing the thoughts as products of their own mind."
      ],
      teach:"The so-called 'Pure O' presentation involves entirely covert obsessions and compulsions — mental rituals like silent counting, phrase repetition, or mental reviewing rather than visible washing or checking — and is frequently missed or misdiagnosed as generalized anxiety precisely because there's nothing to observe from the outside."
    },
    {
      id:"hard-hoarding", date:"2026-06-13", answer:"Hoarding Disorder",
      accept:["hoarding disorder","hoarding"],
      clues:[
        "Adult protective services requests an evaluation of a 67-year-old retired teacher after a neighbor complained about odor coming from her house.",
        "The home visit reveals narrow pathways winding between floor-to-ceiling stacks of newspapers, unopened mail going back over a decade, and expired food containers in the kitchen; the stove and one bathroom are inaccessible under accumulated items.",
        "Given her background as a teacher and her articulate, composed manner during the interview, an evaluator might expect her to have reasonable insight and simply need practical help — perhaps this is best framed as a decluttering or organizational problem rather than a psychiatric one.",
        "But when asked directly about the state of the home, she insists it's \"not that bad,\" that she has \"a system,\" and becomes visibly distressed and defensive at any suggestion of removing items — even the expired food, which she says she's \"planning to sort through.\"",
        "She describes acute distress at the thought of discarding a stack of decade-old newspapers because \"there might be an article in there I need,\" and this pattern has been building gradually for over fifteen years, worsening notably after her husband died and no longer helped manage the house.",
        "The disconnect between the objective severity — a home that is now unsafe and largely unlivable — and her calm, minimizing account of it is itself a core diagnostic feature, not just a communication style.",
        "Persistent difficulty discarding or parting with possessions, regardless of their actual value, due to a perceived need to save them and distress associated with discarding, resulting in accumulation that congests and clutters living areas and substantially compromises their intended use, with many affected individuals showing limited insight into the problem's severity."
      ],
      teach:"Poor insight is common and specifically recognized in this diagnosis — patients often minimize the severity of clutter and safety risk even when the objective home environment is unsafe, which is part of why it frequently comes to clinical attention through family, neighbors, or protective services rather than self-referral."
    },
    {
      id:"hard-bulimia", date:"2026-06-14", answer:"Bulimia Nervosa",
      accept:["bulimia nervosa","bulimia"],
      clues:[
        "A 26-year-old male competitive cyclist is referred by his primary care doctor for evaluation of unexplained electrolyte abnormalities and worn dental enamel found at a recent dental cleaning.",
        "He initially attributes both to \"just training hard\" and a sports drink habit, and given his athletic build and lack of any visible weight loss, an eating disorder isn't the first thing that comes to mind for either doctor.",
        "His BMI is solidly in the normal range and he doesn't fit the more familiar image of a severely underweight young woman, which is part of why two prior visits didn't probe further.",
        "On more detailed questioning, he discloses recurrent episodes, at least twice a week for the past four months, of eating what he acknowledges is an objectively large amount of food — an entire pizza plus a box of cereal — within about an hour, during which he feels he cannot stop or control what or how much he's eating.",
        "Afterward, driven by intense guilt about the impact on his racing weight and performance, he goes for punishing two-to-three-hour rides regardless of injury, weather, or exhaustion, specifically to \"burn off\" the binge — rather than the self-induced vomiting or laxative use more commonly pictured with this diagnosis — and his self-evaluation is almost entirely dictated by his weight and how the last ride went.",
        "The compensatory mechanism here is exercise rather than purging, and the patient is male and not underweight — two features that made this easy to overlook, but neither changes what the underlying pattern actually is.",
        "Recurrent episodes of eating an amount of food definitively larger than most people would eat in a similar period, with a sense of lack of control over eating during the episode, followed by recurrent inappropriate compensatory behavior to prevent weight gain (which may include excessive exercise as well as self-induced vomiting or laxative misuse), occurring at least once a week for three months, with self-evaluation unduly influenced by body shape and weight, not occurring exclusively during episodes of anorexia nervosa."
      ],
      teach:"This diagnosis is often missed in male athletes because compensatory behavior can take the form of excessive, compulsive exercise rather than purging, and normal-or-athletic body weight doesn't rule it out — clinicians should think of it whenever unexplained electrolyte abnormalities or dental erosion show up in a performance-focused athlete."
    },
    {
      id:"hard-pica", date:"2026-06-15", answer:"Pica",
      accept:["pica"],
      clues:[
        "A 34-year-old woman presents to primary care with abdominal pain and constipation; routine labs, including a negative pregnancy test, reveal iron-deficiency anemia and a mildly elevated blood lead level.",
        "When asked about her diet, she reluctantly discloses she eats spoonfuls of a specific white clay, sold in small bags at a corner store, most days — a practice she says her grandmother and several older women in her family have done \"forever,\" tied to their family's roots in rural Georgia.",
        "This raises an immediate question of whether this is simply a culturally recognized dietary practice that shouldn't be pathologized at all — clay-eating of this kind is a documented, generations-old tradition in some communities, generally consumed in small, occasional, ritualized amounts without clinical consequence.",
        "But her pattern differs sharply from what's practiced around her: her grandmother eats a pinch occasionally, a few times a month, from a trusted source; the patient has escalated to eating several tablespoons multiple times a day for the past eight months, buys it in bulk, hides the extent of it even from her grandmother, and has had two prior instances of severe constipation requiring emergency evaluation.",
        "Her iron-deficiency anemia might suggest the eating is simply a craving driven by low iron that would resolve with iron repletion alone — a recognized association — but her consumption began, by her own account, over a year before any anemia was ever detected, and has continued unabated through two months of aggressive iron supplementation.",
        "What separates this from her family's longstanding, moderate, culturally sanctioned practice is scale, persistence beyond a socially normative pattern, and the fact that it's now causing physical harm and functional consequences she's hiding rather than sharing openly the way the practice is used around her.",
        "Persistent eating of nonnutritive, non-food substances for at least one month, at a developmental stage where the behavior is inappropriate and not part of a culturally supported or socially normative practice, severe enough to warrant independent clinical attention."
      ],
      teach:"Culturally sanctioned or ritualized ingestion of non-food substances, such as certain traditional clay-eating practices, does not by itself meet criteria — the diagnosis requires that the pattern exceed what is developmentally and culturally normative and cause clinically significant risk or impairment, so a careful comparison to the actual community practice (frequency, quantity, openness) is essential rather than assuming any culturally-rooted practice is automatically pathological."
    },
    {
      id:"hard-bed", date:"2026-07-17", answer:"Binge-Eating Disorder",
      accept:["binge-eating disorder","binge eating disorder","bed"],
      clues:[
        "A 29-year-old woman with Crohn's disease is referred to psychiatry after a nutrition consult flags an \"unusual eating pattern\" — this despite a 12-pound weight loss during her most recent flare.",
        "She describes at least three nights a week eating an entire loaf of bread, a full sleeve of crackers, and a jar of peanut butter within under an hour, alone in her kitchen after her partner falls asleep.",
        "Given the eating episodes, the referring nurse first wondered about bulimia nervosa — but she denies any vomiting, laxative use, fasting, or compensatory exercise, and her weight loss is fully explained by active bowel inflammation documented on a recent colonoscopy.",
        "She eats rapidly, well past comfortably full to the point of stomach pain, and feels intense shame and disgust afterward — but she doesn't diet, doesn't restrict, and has no distorted sense of her body shape driving any of it.",
        "The episodes have occurred at least weekly for eight months, worsening whenever her work stress spikes.",
        "Her psychiatrist notes this diagnosis is frequently missed in patients who are thin or actively losing weight, because clinicians assume the pattern only shows up in people who are overweight.",
        "Recurrent episodes of eating, within a discrete period of time, an amount of food definitely larger than most people would eat under similar circumstances, with a sense of lack of control over eating during the episode; episodes marked by at least three of eating much more rapidly than normal, eating until uncomfortably full, eating large amounts when not physically hungry, eating alone due to embarrassment, or feeling disgusted, depressed, or guilty afterward; occurring at least once a week for three months, without the regular use of compensatory behaviors."
      ],
      teach:"This disorder is not defined by body weight — it occurs across the weight spectrum, and a comorbid GI illness causing weight loss can mask or delay recognition. The absence of compensatory behavior (purging, fasting, excessive exercise) is what distinguishes it from bulimia nervosa."
    },
    {
      id:"hard-rumination", date:"2026-07-18", answer:"Rumination Disorder",
      accept:["rumination disorder","rumination"],
      clues:[
        "A 47-year-old man is referred to psychiatry after a decade-long gastroenterology odyssey: three endoscopies, a pH-impedance study, and a gastric emptying scan for \"unexplained regurgitation,\" all essentially unremarkable.",
        "He describes bringing food back up into his mouth within ten to fifteen minutes of nearly every meal, without nausea or retching, then either re-chewing and swallowing it or spitting it out.",
        "His gastroenterologist initially treated him for GERD and then gastroparesis, since a gastric emptying study showed mild delay — but the regurgitation was unchanged on medication and had predated any objective slowing by years.",
        "He denies inducing vomiting and denies any concern with weight or shape; the regurgitation seems almost effortless and unbothered to him — \"It's just what happens, I've done it since I was a teenager under stress.\"",
        "It worsens when he's anxious or alone, and he's noticed he can partially suppress it when consciously distracted, like during a business call.",
        "The behavior isn't driven by disgust with food or a drive for thinness, and it isn't explained by a motility disorder — it looks almost habitual, a learned pattern built into the act of digestion itself.",
        "Repeated regurgitation of food over a period of at least one month, where food may be re-chewed, re-swallowed, or spit out; not attributable to an associated gastrointestinal or other medical condition, and not occurring exclusively during the course of another eating disorder."
      ],
      teach:"Rumination disorder in adults is frequently missed because it mimics GERD or gastroparesis and undergoes years of GI workup before medical causes are exhausted. The key distinguishing features are effortless regurgitation without nausea or retching, and the absence of purging intent or body-image drive."
    },
    {
      id:"hard-narcolepsy", date:"2026-07-19", answer:"Narcolepsy",
      accept:["narcolepsy"],
      clues:[
        "A 16-year-old girl is brought to neurology for \"seizures\" — sudden episodes where her knees buckle and her head drops for a few seconds while she stays fully conscious, occurring almost exclusively when she laughs at something funny.",
        "She was started on an anti-seizure medication for a presumed atonic seizure disorder after a routine EEG was read as \"nonspecific slowing,\" and her family credits the medication with a partial drop in episode frequency.",
        "Video EEG monitoring during a witnessed episode shows no epileptiform activity at all — in retrospect, the apparent improvement on medication looks like observation bias, since the episodes were never true seizures to begin with.",
        "Further history reveals near-daily irresistible urges to nap despite nine hours of nighttime sleep, vivid dream-like hallucinations as she's drifting off, and one episode of briefly being unable to move or speak for a minute right after waking.",
        "Her mother initially chalked the sleepiness up to \"being a typical exhausted teenager\" with a heavy course load, which delayed the right workup by over a year.",
        "The leg-buckling episodes are triggered specifically by strong emotion, not by sleep deprivation or flashing lights — and it's a sleep study, not another EEG, that ultimately settles the diagnosis.",
        "Recurrent periods of an irrepressible need to sleep or lapsing into sleep, occurring at least three times per week over the past three months, together with at least one of the following: episodes of sudden bilateral loss of muscle tone triggered by laughter or joking; cerebrospinal fluid hypocretin deficiency; or a REM sleep latency of 15 minutes or less, or two or more sleep-onset REM periods, on nocturnal polysomnography or multiple sleep latency testing."
      ],
      teach:"Cataplexy is frequently mistaken for atonic or absence seizures in adolescents, and a normal video-EEG during a witnessed spell should prompt a sleep-focused workup rather than an epilepsy diagnosis. The tell is the emotional trigger — laughter — rather than the triggers typical of seizures."
    },
    {
      id:"hard-aud", date:"2026-07-20", answer:"Alcohol Use Disorder",
      accept:["alcohol use disorder","aud","alcoholism"],
      clues:[
        "A 51-year-old managing partner at a law firm comes in for an executive physical requested by his wife, opening with \"I don't have a problem, I run a 40-person practice.\"",
        "He reports \"two glasses of wine most nights to unwind,\" but when the nurse asks him to pour his usual amount into a measuring cup, it comes out closer to a full bottle, plus a nightcap of scotch most evenings — he'd genuinely underestimated it.",
        "His labs are reassuring: normal liver enzymes, unremarkable exam — which he cites as proof there's no issue, along with the fact that he's never missed a court filing or lost a case because of it.",
        "Further questioning reveals he now needs three or four drinks to get the effect two used to produce, has tried and failed to cut down twice in the past year, and keeps a bottle in his desk drawer for the afternoon.",
        "His wife mentions he was pulled over after a client dinner last spring (no charges filed), and that he turns defensive and dismissive any time she raises the subject — even as he remains the firm's top biller.",
        "Professional success and clean labs don't rule this out here — what matters is the pattern underneath: escalating tolerance, failed attempts to cut back, and continued use despite recurrent interpersonal and safety consequences.",
        "A problematic pattern of use leading to clinically significant impairment or distress, manifested by at least two of eleven criteria within a 12-month period, including tolerance, unsuccessful efforts to cut down or control use, use in situations that are physically hazardous, and continued use despite recurrent social or interpersonal problems caused or worsened by its effects."
      ],
      teach:"High-functioning presentations often escape detection because professional success and normal labs get mistaken for evidence against the diagnosis. The DSM-5 criteria hinge on the behavioral pattern — tolerance, failed quit attempts, use despite consequences — not on occupational impairment or lab abnormalities."
    },
    {
      id:"hard-oud", date:"2026-07-21", answer:"Opioid Use Disorder",
      accept:["opioid use disorder","oud"],
      clues:[
        "A 58-year-old woman with failed back surgery syndrome — three lumbar surgeries — has been on a stable oxycodone regimen for six years and calls the clinic asking for an early refill, saying \"the pain is worse than it's ever been.\"",
        "Her pain scores and functional decline could plausibly reflect inadequate analgesia for worsening degenerative disease: a recent MRI does show new disc changes, and undertreated pain alone can produce drug-seeking-appearing behavior that resolves once dosing is adequate.",
        "But further history complicates the picture — she's run out early twice in four months, got a partial fill from an urgent care during a weekend \"flare,\" and admits taking extra pills before stressful family visits \"to take the edge off,\" not just for the pain.",
        "Her husband notes she seems sedated and withdrawn between doses rather than more functional, and she's stopped attending physical therapy and her grandchildren's events despite the medication.",
        "When her dose was held steady for reassessment, she developed sweating, cramping, and anxiety toward the end of each dosing interval, and pushed back hard against any taper, uncharacteristically hostile with staff.",
        "The distinguishing feature isn't tolerance or physical dependence, which occur with any long-term opioid use — it's the pattern of taking more than prescribed, using for non-pain reasons, and continued use despite worsening rather than improving function.",
        "A problematic pattern of use leading to clinically significant impairment or distress, with at least two of eleven criteria within a 12-month period — including taking the substance in larger amounts than intended, unsuccessful efforts to cut down, craving, failure to fulfill major role obligations, and continued use despite social or interpersonal problems — noting that tolerance and withdrawal alone do not count toward this diagnosis when the substance is taken as prescribed under appropriate medical supervision."
      ],
      teach:"In chronic pain patients on long-term opioid therapy, tolerance and withdrawal are expected physiologic phenomena and don't by themselves indicate this diagnosis. The key differentiators from pseudoaddiction (undertreated pain) are use beyond prescribed amounts, use for emotional rather than analgesic reasons, and continued use despite functional decline."
    },
    {
      id:"hard-cannabis", date:"2026-07-22", answer:"Cannabis Use Disorder",
      accept:["cannabis use disorder","marijuana use disorder","cud"],
      clues:[
        "A 19-year-old college sophomore is brought to the ER by his roommate after two days of escalating paranoia, insisting people are \"watching him through his laptop camera\" and hearing whispered voices.",
        "He's been using high-potency concentrate multiple times daily for the past year, sharply escalating over the last three weeks during finals; his family history includes a maternal uncle with schizophrenia.",
        "Given the paranoia, hallucinations, and family history, the team initially works him up for a first psychotic break, starting a low-dose antipsychotic and admitting him for observation.",
        "By day four of abstinence and monitoring, the paranoia and hallucinations have fully resolved and he's back to baseline with intact insight — arguing against a primary psychotic illness and pointing instead to a substance-induced picture.",
        "Once the psychosis clears, a separate pattern becomes evident on interview: he's tried to cut down twice and failed, needs more product than a year ago for the same effect, spends most afternoons obtaining or using, and kept using through the week his grades started slipping and through the psychotic episode itself.",
        "Two distinct diagnostic questions are in play here — the acute psychosis was substance-induced and has resolved, but a separate, persistent pattern of use meeting its own criteria remains and is the one requiring ongoing treatment.",
        "A problematic pattern of use leading to clinically significant impairment or distress, with at least two of eleven criteria within a 12-month period, including tolerance, unsuccessful efforts to cut down, great time spent obtaining or using, and continued use despite knowledge of a persistent psychological problem caused or exacerbated by the substance."
      ],
      teach:"Cannabis-induced psychosis typically resolves within days of abstinence and should prompt reassessment rather than an automatic schizophrenia diagnosis — but its occurrence doesn't rule out, and often co-occurs with, a separate underlying use disorder requiring its own criteria-based diagnosis."
    },
    {
      id:"hard-gambling", date:"2026-07-23", answer:"Gambling Disorder",
      accept:["gambling disorder","pathological gambling","compulsive gambling"],
      clues:[
        "A 32-year-old software engineer is brought in for urgent evaluation by his sister after she discovers he's taken out a second personal loan and quietly sold his car to cover online sports-betting losses, on top of $40,000 already gone from savings.",
        "He describes stretches lasting several days where he feels unusually energized, talkative, and barely needs sleep, staying up until 4 a.m. placing bets with a grand sense of confidence that he's \"finally cracked the system.\"",
        "Given the elevated mood, decreased need for sleep, and increased goal-directed activity, the team initially considers a hypomanic episode as the primary driver, with the gambling as a downstream consequence of bipolar spectrum illness.",
        "Closer history complicates that read: the \"energized\" stretches occur only during active betting and evaporate within hours of a loss, replaced by irritability and low mood — they're absent on days he isn't gambling, and he's had no mood episodes independent of wins or losses going back to his first sportsbook account at 22.",
        "He needs to bet larger amounts now to get the same rush, has repeatedly and unsuccessfully tried to cut back, gets restless and irritable when he tries, chases losses \"to get even,\" has lied to his sister about the extent of it, and has asked her to bail him out financially twice before.",
        "The mood elevation here tracks the wins and losses of the behavior itself rather than existing as an independent, sustained mood syndrome — which points away from a primary mood disorder and toward a diagnosis centered on the behavior itself.",
        "Persistent and recurrent problematic engagement in this behavior leading to clinically significant impairment or distress, with at least four of nine criteria within a 12-month period, including needing to engage with increasing amounts of money to achieve the desired excitement, repeated unsuccessful efforts to control or stop, restlessness or irritability when attempting to cut down, chasing losses, lying to conceal the extent of involvement, and relying on others to relieve a desperate financial situation caused by it."
      ],
      teach:"The euphoric, high-energy states some gamblers describe during active betting can mimic hypomania, but true bipolar spectrum mood episodes are sustained and independent of the behavior. When elevated mood rises and falls strictly with wins and losses, the behavioral disorder itself is the primary diagnosis."
    },
    {
      id:"hard-agoraphobia", date:"2026-07-24", answer:"Agoraphobia",
      accept:["agoraphobia"],
      clues:[
        "A 61-year-old retired postal worker with longstanding IBS has stopped attending church, grocery shopping, or riding the bus over the past eight months, now relying entirely on his daughter for errands.",
        "He denies ever having a sudden surge of intense fear with racing heart, chest tightness, or a sense of impending doom — a cardiac workup after his first evaluation was negative, and he has no history of panic attacks.",
        "Because there's no panic attack history, the referring physician initially questioned whether this was even the right category, wondering instead about depression-related withdrawal or a narrow phobia of public restrooms.",
        "The trigger traces back to a single mortifying episode of fecal incontinence in the checkout line at a grocery store; since then he avoids any place without a \"quick, private, known\" bathroom nearby — buses, church pews, restaurant tables far from restrooms, and long checkout lines all provoke intense anxiety about being trapped if his bowels act up.",
        "He can tolerate these places briefly if he's mapped out the bathroom in advance and sits near an exit, but generally avoids them altogether or endures them only with his daughter present \"in case something happens.\"",
        "What's driving the avoidance isn't fear of the places themselves, and it isn't classic panic — it's fear of a specific incapacitating or embarrassing symptom striking somewhere escape would be difficult or help unavailable, and the resulting active avoidance of multiple such settings.",
        "Marked fear or anxiety about two or more of the following: using public transportation, being in open spaces, being in enclosed places, standing in line or being in a crowd, or being outside the home alone — out of concern that escape might be difficult or help might not be available if incapacitating or embarrassing symptoms develop; the situations are actively avoided, require a companion, or are endured with intense fear, persisting six months or longer and causing significant impairment."
      ],
      teach:"This diagnosis doesn't require a co-occurring panic disorder or panic attacks — DSM-5 recognizes fear of incapacitating or embarrassing symptoms, such as incontinence, in situations where escape would be difficult as a sufficient trigger, and it's diagnosed and coded independently of panic disorder."
    },
    {
      id:"hard-sad", date:"2026-07-25", answer:"Social Anxiety Disorder",
      accept:["social anxiety disorder","social phobia","sad"],
      clues:[
        "A 24-year-old graduate student, originally from Japan, is referred by her academic advisor after requesting an all-online course load, citing overwhelming discomfort in seminar settings.",
        "She doesn't describe a fear of looking foolish or being judged herself; her paramount worry is that her blushing, her hands trembling at the whiteboard, or an awkward moment of eye contact will make her professors and classmates feel uncomfortable or burdened.",
        "Because her fear centers on others' discomfort rather than her own embarrassment, the first clinician she saw considered this outside the usual bounds of the diagnosis and leaned toward an autism-spectrum evaluation for social difficulty.",
        "Further history clarifies things: she has no trouble with social reciprocity or nonverbal communication one-on-one or in familiar settings, no restricted interests, and reports the same worry pattern going back to middle school in Japan — worse specifically in situations requiring performance in front of a group, and markedly better in small, predictable, low-stakes settings.",
        "She avoids seminars, turned down a teaching-assistant position she was well qualified for, and when she can't avoid presenting, endures it with sweating and a racing heart, replaying the interaction for days afterward worrying she made others uneasy.",
        "This is a recognized cultural variant of the same underlying fear structure — rather than fearing personal humiliation, the anxiety centers on the belief that one's own visible anxiety or conduct will offend, embarrass, or burden other people, but it still meets the same behavioral and functional criteria.",
        "Marked fear or anxiety about one or more social situations involving possible scrutiny by others, in which the individual fears acting or showing anxiety symptoms in a way that will be negatively evaluated — including, in some cultural contexts, a fear that one's behavior will be offensive to or a burden on others; the situations are avoided or endured with intense distress, are out of proportion to the actual threat, persist six months or more, and cause significant impairment."
      ],
      teach:"DSM-5 explicitly accommodates a taijin-kyofusho-like presentation, in which the core fear is offending or burdening others rather than being personally humiliated, as a valid cultural expression of the same disorder rather than a separate or lesser condition — and it should not be mistaken for an autism-spectrum social communication difficulty."
    },
    {
      id:"hard-specific-phobia", date:"2026-07-26", answer:"Specific Phobia",
      accept:["specific phobia","natural environment phobia","phobia of storms"],
      clues:[
        "A 44-year-old accountant with no childhood fear of weather seeks help two years after a tornado tore the roof off her office building while she sheltered in a stairwell; she wasn't physically injured.",
        "Since then, she checks radar apps compulsively the moment a severe thunderstorm watch is issued anywhere in her county, and during any storm with thunder she has a full panic response — racing heart, trembling, an overwhelming urge to get to a basement, even during an ordinary summer shower with no warnings in effect.",
        "Given the clear life-threatening precipitating event, the referring clinician initially screened her for a trauma-and-stressor-related diagnosis, but she denies intrusive memories or nightmares of the tornado itself, denies flashbacks, and works in the same office building daily without distress or avoidance of it.",
        "Her fear is narrowly and specifically cued by storm-related stimuli — darkening skies, thunder, severe weather alerts — not by generalized reminders of the event; she reports no negative shift in beliefs about herself or the world, no anhedonia, and no exaggerated startle outside of actual weather cues.",
        "She's declined two work trips scheduled during her region's storm season and now sleeps with a weather radio on in case a storm develops overnight, recognizing the response is excessive relative to her actual risk of harm from an ordinary thunderstorm.",
        "What's being triggered is a discrete, disproportionate fear response to the storm itself, not the broader constellation of re-experiencing, avoidance of trauma cues, and mood or arousal changes that would point toward a trauma-related diagnosis — the fear stays circumscribed rather than pervasive.",
        "Marked fear or anxiety about a specific object or situation — here, a natural environment cue — that almost always provokes immediate fear, is actively avoided or endured with intense distress, and is out of proportion to the actual danger posed, persisting six months or longer and causing significant impairment."
      ],
      teach:"A phobia can develop in adulthood following a genuine traumatic exposure, but the diagnostic line to a trauma-and-stressor-related disorder rests on whether the fear stays circumscribed to the triggering stimulus itself versus broadening into intrusive re-experiencing, avoidance of trauma reminders, and pervasive negative mood and arousal changes."
    },
  ]
};

const MAX = { easy:5, medium:6, hard:7 };
const LABEL = { easy:"Easy", medium:"Medium", hard:"Hard" };
const DIFFS = ["easy","medium","hard"];
