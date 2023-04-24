import json
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from langchain.prompts.example_selector import LengthBasedExampleSelector
from langchain.llms import OpenAI

examples = [
    {
        "query": "What cities in the world flood the most?",
        "answer": '[{{"lon":90.4074,"lat":23.7104,"blurb":"Dhaka, Bangladesh is one of the most flood-prone cities in the world. Situated in the delta region of the Ganges-Brahmaputra-Meghna river system, the city is highly susceptible to flooding due to heavy monsoon rains and rising sea levels. Climate change has exacerbated this problem, leading to more intense rainfall and higher flood risks for the city\'s inhabitants."}}]'
    },
    {
        "query": "What is the average temperature of Miami, FL?",
        "answer": '[{{"lon":-80.191790,"lat":25.761680,"blurb":"The average annual temperature in Miami, FL is around 77°F (25°C). The city faces environmental concerns such as rising sea levels due to climate change, increased hurricane activity, and threats to the local ecosystem, including the Everglades."}},{{"lon":-80.214012,"lat":25.986765,"blurb":"While the average temperature in Hialeah, FL is similar to Miami, the city faces its own environmental challenges such as rising sea levels, coastal flooding, urban sprawl, air pollution, and water quality issues."}},{{"lon":-80.143378,"lat":25.860048,"blurb":"Miami Beach, FL, also shares a similar average temperature to Miami. The city is grappling with threats from sea-level rise, coastal erosion, and the loss of natural habitats. Beach renourishment and wetland restoration are some of the measures being taken to address these issues."}}]'
    },
    {
        "query": "What is the hottest place on Earth?",
        "answer": '[{{"lon":30.482,"lat":15.775,"blurb":"Lut Desert, Iran, holds the record for the highest temperature ever recorded on Earth. The surface temperature reached a staggering 159.3°F (70.7°C) in 2005. The region is characterized by a lack of vegetation, extreme aridity, and harsh living conditions. The primary environmental concern in the Lut Desert is desertification, which exacerbates water scarcity and threatens the fragile ecosystems."}}]'
    }
]

def lambda_handler(event, context):
    
    # print('***', event)
    
    content_type = event['headers']['content-type']
    query = None
    if (content_type == 'application/json'):
        body = json.loads(event['body'])
        user_prompt = body['prompt']
    else:
        # return 'Content-Type not supported!'
        return {
            'statusCode': 500,
            'body': 'content-type not supported!'
        }
        
    # print('body ->', body)
    
    # Instantiate LLM
    llm = OpenAI(temperature=0)
    
    # Prompt Template
    formatted_template = """
    Can you return an array of objects as a JSON formatted string that are geographically relevant to an arbitrary query?
    REQUIREMENTS:
    - Each object in the array should contain 3 keys
    - lon is the longitude of the coords for each match to the query
    - lat is the latitude of the coords for each match to the query
    - blurb is the 1-3 sentence answer to the query along with information about the environmental concerns of the city or region in which the coords exist
    - The array should be max length 3
    - the overall length of the answer should be maximum 500 characters and a fully parsable JSON string
    - if you cannot provide accurate information then please provide your best guess along with a disclaimer
    
    The arbitrary query is below\n {query}\n{answer}\n
    """

    prompt_tmplt = PromptTemplate(
        input_variables=["query", "answer"],
        template=formatted_template,
    )
    
    prompt_selector = LengthBasedExampleSelector(
        examples=examples,
        example_prompt=prompt_tmplt
    )
    
    dynamic_prompt = FewShotPromptTemplate(
        example_selector=prompt_selector,
        example_prompt=prompt_tmplt,
        prefix="""Answer each query""",
        suffix="Query: {input}\n",
        input_variables=["input"],
        example_separator="\n\n",
    )

    prompt = dynamic_prompt.format(input=f'{user_prompt}')
    
    # print('prompt', prompt)
    
    resp = llm(prompt)
    
    # print('resp', resp)
    
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps(resp)
    }
