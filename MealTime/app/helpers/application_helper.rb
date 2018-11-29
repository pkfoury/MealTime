module ApplicationHelper
    def get_today
        Time.now.strftime("%m/%d/%y")
    end
end
