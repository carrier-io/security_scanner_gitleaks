from typing import Optional
from pylon.core.tools import log
from pydantic import BaseModel


class IntegrationModel(BaseModel):
    squash_commits: Optional[bool] = False
    show_offender_line: Optional[bool] = True
    redact_offenders: Optional[bool] = False
    hide_commit_author: Optional[bool] = False
    use_custom_rules: Optional[bool] = False
    custom_rules_path: Optional[str] = ""
    additional_text: Optional[str] = ""
    commit_line_limit: Optional[int] = 15
    save_intermediates_to: Optional[str] = '/data/intermediates/sast'

    def check_connection(self) -> bool:
        try:
            return True
        except Exception as e:
            log.exception(e)
            return False
    

