import os, requests, json
api_key = os.getenv("NEWSORG_API_KEY")

file = open("data.json", 'w+', encoding='utf-8')


def fetch_everything(q: str=None, 
                     searchin: str=None, 
                     sources: str=None, 
                     domains: str=None, 
                     excludedomains: str=None, 
                     _from: str=None, 
                     to: str=None, 
                     language: str=None, 
                     sortby: str=None, 
                     pagesize: int=None, 
                     page: int=None):
    print("Running")
    url = f'https://newsapi.org/v2/everything?apiKey={api_key}'
    if q:
        url += f'&q={q}'
    if searchin:
        url += f'&searchIn={searchin}'
    if sources:
        url += f'&sources={sources}'
    if domains:
        url += f'&domains={domains}'
    if excludedomains:
        url += f'&excludeDomains={excludedomains}'
    if _from:
        url += f'&from={_from}'
    if to:
        url += f'&to={to}'
    if language:
        url += f'&language={language}'
    if sortby:
        url += f'&sortBy={sortby}'
    if pagesize:
        url += f'&pageSize={pagesize}'
    if page:
        url += f'&page={page}'
    r = requests.get(url)
    data = r.json()
    if data.get('status') != 'ok':
        print(url)
        raise Exception(data)
        
    return r.json()

a = fetch_everything(q=input("Query:"), _from=input("From Date (yyyy-mm-dd): "), to=input("To Date (yyyy-mm-dd): "), language=input("Language: "), sortby=input("Sort: "), pagesize=input("Page Size: "), sources=input("Sources: "), domains=input("Domains to include: "), excludedomains=input("Domains to exclude: "), page=input("Page Number: "))['articles']
xyz = {}
for i in range(len(a)):
    xyz[i+1] = a[i]
json.dump(xyz, file, ensure_ascii=False)
file.close()
print(len(a))