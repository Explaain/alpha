var structure = {
	evidence: [
		{
			name: 'profile',
			full_name: 'Profile',
			colours:
			{
				normal: '#cc0000',
				light: '#ffdddd'
			}
		},
		{
			name: 'quote',
			full_name: 'Quote',
			colours:
			{
				normal: '#0000cc'
			}
		},
		{
			name: 'definition',
			full_name: 'Definition',
			colours:
			{
				normal: '#00cc00'
			}
		},
		{
			name: 'fact',
			full_name: 'Fact',
			colours:
			{
				normal: '#cccc00'
			}
		}

	]
};

var story = {
	name:'election-debates',
	title: 'Election Debates',
	image: 'http://upload.wikimedia.org/wikipedia/commons/6/64/Carter_and_Ford_in_a_debate,_September_23,_1976.jpg',
	imageCredit: 'White House Photograph Courtesy Gerald R. Ford Library / Wikimedia',
	imageCreditUrl: 'http://en.wikipedia.org/wiki/United_States_presidential_election_debates#mediaviewer/File:Carter_and_Ford_in_a_debate,_September_23,_1976.jpg',
	gist: '<p><a href="#detail-0">The pre-election TV leaders\' debates are looking likely to go ahead</a>, <a href="#detail-1">after shaky negotiations over the format</a>.</p>'
	+ '<p><a href="#detail-2">After refusing to take part in debates that featured Ukip but not the Greens</a>, <a href="#detail-3">David Cameron has called the broadcasters\' new proposal "good progress"</a>.</p>'
	+ '<p><a href="#detail-4">Ed Miliband, Nick Clegg and Nigel Farage all called this veto "unacceptable",</a> <a href="#detail-5">but then Clegg asked broadcasters for new proposals</a>.</p>'
	+ '<p><a href="#detail-6">Cameron has yet to confirm he\'ll now take part</a>, <a href="#detail-7">amid speculation that he never wanted to be involved at all</a>.</p>',
	deets: [
		'TV debates between the leaders of the main political parties will probably be held in April.',
		'The original proposal for the debate format was <a href="#evidence-cameron-election-debates-greens-pmqs" class="evidence quote">vetoed by Cameron</a>, after which the broadcasters put forward a new proposal.',
		'The original proposal featured three different debates including the Conservatives, Labour, the Lib Dems and Ukip - but not the Greens - but Cameron <a href="#evidence-cameron-election-debates-greens-pmqs" class="evidence document">argued</a> that the Greens beat the Lib Dems in the last local elections.',
		'Cameron <a href="#evidence-cameron-debates-good-progress" class="evidence quote">said he was "delighted"</a> the four broadcasters had "gone away and thought again".',
		'Miliband, Clegg and Farage <a href="#evidence-clegg-farage-miliband-debates-letter" class="evidence document">wrote identical letters</a> to Cameron.',
		'Clegg had said the broadcasters - the BBC, Sky News, ITV and Channel 4 - should come up with "other proposals".',
		'Cameron gave no commitment on whether he\'d "turn up" but <a href="#evidence-cameron-debates-good-progress" class="evidence quote">indicated he was happy with the changes made</a>.',
		'Clegg said Labour and the Conservatives were using the Greens as an "alibi" to block the debates.'
	]
};

var evidence = [
	{
		name: 'european-union',
		title: 'EU',
		type: 'definition',
		content: 'An economic and political union of 28 member states primarily located in Europe.',
		keywords: [
			'European Union',
			'Europe'
		]
	},
	{
		name: 'david-cameron',
		title: 'David Cameron',
		type: 'profile',
		content: 'Prime Minister in the Coalition since 2010 and Leader of the Conservatives since 2005.',
		image: 'http://upload.wikimedia.org/wikipedia/commons/2/21/David_Cameron_official.jpg',
		keywords: [
			'Cameron',
			'Prime Minister',
			'PM',
			'Conservative Leader',
			'Tory Leader'
		]
	},
	{
		name: 'ed-miliband',
		title: 'Ed Miliband',
		type: 'profile',
		content: 'Leader of the Labour Party since 2010.',
		keywords: [
			'Miliband',
			'Labour Leader'
		]
	},
	{
		name: 'nick-clegg',
		title: 'Nick Clegg',
		type: 'profile',
		content: 'Deputy Prime Minister in the Coalition since 2010 and Leader of the Lib Dems since 2007.',
		keywords: [
			'Clegg',
			'Deupty Prime Minister',
			'Deputy PM',
			'Lib Dem Leader'
		]
	},
	{
		name: 'nigel-farage',
		title: 'Nigel Farage',
		type: 'profile',
		content: 'Leader of Ukip since 2006* and an MEP. Hoping to become an MP in the general election.',
		keywords: [
			'Farage',
			'Ukip Leader'
		]
	},
	{
		name: '2010-uk-coalition',
		title: '2010 Coalition Government',
		type: 'profile',
		content: 'A UK political party, currently the majority party in coalition government with the Lib Dems. Led by David Cameron.',
		keywords: [
			'the Coalition'
		]
	},
	{
		name: 'conservative-party',
		title: 'Conservative Party',
		type: 'profile',
		content: 'A UK political party, currently the majority party in coalition government with the Lib Dems. Led by David Cameron.',
		keywords: [
			'the Conservatives',
			'Tories',
			'Tory party'
		]
	},
	{
		name: 'labour-party',
		title: 'Labour Party',
		type: 'profile',
		content: 'A UK political party, currently in opposition against the coalition government. Led by Ed Miliband.',
		keywords: [
			'Labour'
		]
	},
	{
		name: 'liberal-democrat-party',
		title: 'Lib Dems',
		type: 'profile',
		content: 'A UK political party, currently the minority party in coalition government with the Conservatives. Led by Nick Clegg.',
		keywords: [
			'Liberal Democrats',
			'Lib Dem Party',
			'Liberal Democrat Party',
			'Liberals'
		]
	},
	{
		name: 'ukip-party',
		title: 'Ukip',
		type: 'profile',
		content: 'A UK political party, currently with two MPs. It has risen in profile recently and won the European elections last year. Led by Nigel Farage.',
		keywords: [
			'Ukip Party'
		]
	},
	{
		name: 'green-party',
		title: 'Green Party',
		type: 'profile',
		content: 'A UK political party, currently with one MP. It overtook the Lib Dems and Ukip in membership this month. Led by Natalie Bennett.',
		keywords: [
			'the Greens'
		]
	},
	{
		name: 'general-election-2015',
		title: 'General Election 2015',
		type: 'definition',
		content: 'The next UK general election will be on May 7th 2015.',
		keywords: [
			'2015 general election',
			'general election 2015',
			'2015 General Election',
			'2015 election'
		]
	},
	{
		name: 'general-election',
		title: 'General Election',
		type: 'definition',
		content: 'A general election decides which political parties will be in government. The <a href="#evidence-general-election-2010" class="evidence definition">last UK general election was in 2010</a> and <a href="#evidence-general-election-2015" class="evidence definition">the next one is in May 2015</a>.',
		keywords: [
			'general election'
		]
	},
	{
		name: 'general-election-2010',
		title: 'General Election 2010',
		type: 'definition',
		content: 'The last UK general election was in May 2010. No party secured a majority of seats and a coalition government resulted between the Conservatives and the Lib Dems.',
		keywords: [
			'2010 general election',
			'general election 2010',
			'2010 General Election',
			'2010 General'
		]
	},
	{
		name: 'clegg-broadcasters-other-proposals',
		title: 'Nick Clegg on new debate proposals',
		type: 'quote',
		content: 'The broadcasters need to come forward with other proposals because clearly the current one - which I\'m not wildly happy about because it excludes me as a leader of a governing party - so they need to come forward with a proposal. I\'ll get my soapbox out any day of the week.',
		keywords: []
	},
	{
		name: 'clegg-farage-miliband-debates-letter',
		title: 'Joint letter on leaders\' debates from Clegg, Farage and Miliband.',
		type: 'document',
		content: '<p>Dear David</p>'

		+ '<p>In 2010 the televised leaders\' debates provided an unprecedented opportunity for voters to see the party leaders debate the critical issues facing our country. The debates were watched by more than 20 million people and enthusiastically endorsed by all those who took part, including yourself.</p>'

		+ '<p>In recent days, you have announced that you are unwilling to take part in debates as proposed by the main broadcasters for the 2015 General Election. I believe it would be a major setback to our democratic processes if these debates were not repeated in 2015 because of one politician\'s unwillingness to participate...</p>'

		/* + '<p>I hope you will agree that the decision as to who should take part in the televised debates should not be in the hands of any party leader, each of whom inevitably has their own political interests to defend. It must be a decision independently and objectively arrived at.</p>'

        + '<p>As you know, the broadcasters, who have strict obligations of political impartiality under the BBC Charter or their Ofcom licences, have together made such an objective determination. While each of the other parties invited to take part in the debates has their own views on the proposal and the levels of participation offered and will continue to make their case in this regard, we all accept the independence and impartiality of the broadcasters and have committed to take part in the debates.</p>'

        + '<p>It would be unacceptable if the political self-interest of one party leader were to deny the public the opportunity to see their leaders debate in public. Therefore, if you are unwilling to reconsider, the three party leaders who have committed to participate will ask the broadcasters to press ahead with the debates and provide an empty podium should you have a last minute change of heart.</p>'

        + '<p>These debates are not the property of the politicians and I do not believe the public will accept lightly the prospect of any politician seeking to block them.  </p>'

        + '<p>Yours sincerely</p>'*/,
		keywords: [],
		source: 'LabourList',
		sourceUrl: 'http://labourlist.org/2015/01/miliband-clegg-and-farage-pile-pressure-on-cameron-over-debates/'
	},
	{
		name: 'cameron-election-debates-greens-pmqs',
		title: 'Cameron on leaders\' debates and the Greens',
		type: 'quote',
		content: 'I am all for these debates, but you cannot have two minor parties without the third minor party... We had a set of European elections this year, and Ukip and the Greens both beat the Liberal Democrats I\'m afraid to say. It\'s very simple: you either have both of them or you have none of them. So let me ask him again: why are you so chicken when it comes to the Greens?',
		keywords: []
	},
	{
		name: '2015-election-leaders-debates',
		title: '2015 election leaders\' debates',
		type: 'definition',
		content: 'After the high profile of the 2010 pre-election TV leaders\' debates, four broadcasters proposed similar debates for 2015. But newly promininent political parties meant a more complicated format for the debates.',
		keywords: [
			'Pre-election TV leaders\' debates',
			'leaders\' debates',
			'TV debates'
		]
	},
	{
		name: '2015-TV-debates-broadcasters',
		title: 'Broadcasters proposing the 2015 TV debates',
		type: 'definition',
		content: 'The BBC, Sky, ITV and Channel 4 have jointly proposed a format for the 2015 TV debates.',
		keywords: [
			'broadcasters'
		]
	},
	{
		name: '2015-debate-proposed-format',
		title: 'Original 2015 election debates proposal',
		type: 'structure',
		content: '<ul>'
		+ '<li>Cameron, Miliband</li>'
		+ '<li>Cameron, Miliband, Clegg</li>'
		+ '<li>Cameron, Miliband, Clegg, Farage</li>'
		+ '<ul>',
		keywords: [
			'original proposal'
		]
	},
	{
		name: '2015-debate-new-format-structure',
		title: 'New 2015 election debates proposal',
		type: 'structure',
		content:  '<ul>'
		+ '<li>Cameron, Miliband (Sky, Channel 4)</li>'
		+ '<li>Cameron, Miliband, Clegg, Farage, Bennett, Sturgeon, Wood (ITV)</li>'
		+ '<li>Cameron, Miliband, Clegg, Farage, Bennett, Sturgeon, Wood (BBC)</li>'
		+ '<ul>',
		keywords: [
			'new proposal'
		]
	},
	{
		name: 'uk-main-political-parties',
		title: 'Main UK political parties',
		type: 'definition',
		content:  'The two dominant political parties in the UK have been Labour and the Conservatives for around a century. But other parties including the Lib Dems, the SNP Ukip and the Greens have surged in popularity in recent years.',
		keywords: [
			'main political parties',
			'UK political party'
		]
	},
	{
		name: 'cameron-debates-good-progress',
		title: 'Cameron on debates \'progress\'',
		type: 'quote',
		content:  '<p>I want to take part. They [the broadcasters] needed to do the minor party thing and they have certainly done that.</p>',
		keywords: [
			'"good progress"',
			'"gone away and thought again"'
		]
	},
	{
		name: '2014-uk-european-elections-results',
		title: '2014 EU election results',
		type: 'data',
		content:  {
			attributes: [
				'color',
				'Party',
				'Votes',
				'% of Vote',
				'% change',
				'MEPs',
				'MEPs change'
			],
			data: [
				[
					'712F87',
					'UK Independence Party',
					4376635,
					27.49,
					10.99,
					24,
					11
				],
				[
					'F72B0F',
					'Labour',
					4020646,
					25.40,
					9.67,
					20,
					7
				],
				[
					'0575C9',
					'Conservative',
					3792549,
					23.93,
					-3.80,
					19,
					-7
				],
				[
					'78C31E',
					'Green',
					1255573,
					7.87,
					-0.75,
					3,
					1
				],
				[
					'FFCD28',
					'Scottish National Party',
					389503,
					2.46,
					0.34,
					2,
					0
				],
				[
					'FE8300',
					'Liberal Democrat',
					1087633,
					6.87,
					-6.87,
					1,
					-10
				]
			]
		},
		defaultDisplay: 'bar chart',
		keywords: [],
		source: 'BBC News',
		sourceURL: 'http://www.bbc.co.uk/news/events/vote2014/eu-uk-results'
	}
];
