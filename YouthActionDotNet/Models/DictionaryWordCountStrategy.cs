using System.Collections.Generic;
using YouthActionDotNet.Models;
using YouthActionDotNet.DAL;

class DictionaryWordCountStrategy : IWordCountStrategy {

    public DictionaryWordCountStrategy(){}

    public Dictionary<string, int> wordCounter(List<Feedback> feedbackList) {
        Dictionary<string, int> wordCounts = new Dictionary<string, int>();
        foreach (Feedback item in feedbackList){   
            foreach (string word in item.FeedbackText.Split(" ")) {
                if (!wordCounts.ContainsKey(word))
                {
                    wordCounts[word] = 1;
                }
                else
                {
                    wordCounts[word]++;
                }
            }
        }
        return wordCounts;
    }
    
}
